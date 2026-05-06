from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Request
from demo.autoplay_controller import CrisisAutoPlayController
import uuid
import logging
import asyncio
import os

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v2/demo", tags=["Demo"])

# Simple in-memory storage for active demo controllers
# demo_id -> controller_instance
active_sessions = {}

def get_websocket_url(request: Request, demo_id: str) -> str:
    """
    Generate the correct WebSocket URL based on the request's origin.
    In production, uses the client's origin. In development, uses localhost.
    """
    # Try to get the origin from the request
    origin = request.headers.get("origin", "").strip()
    
    # If we have an origin (from browser), use it to build WebSocket URL
    if origin:
        # Convert http/https to ws/wss
        if origin.startswith("https://"):
            protocol = "wss"
            host = origin.replace("https://", "")
        else:
            protocol = "ws"
            host = origin.replace("http://", "")
        return f"{protocol}://{host}/api/v2/demo/ws?demo_id={demo_id}"
    
    # Fallback: use host header
    host = request.headers.get("host", "localhost:8000")
    if "vercel.app" in host or host.startswith("https"):
        protocol = "wss"
    else:
        protocol = "ws"
    
    # Remove https:// if it's in the host header
    if host.startswith("https://"):
        host = host.replace("https://", "")
    elif host.startswith("http://"):
        host = host.replace("http://", "")
    
    return f"{protocol}://{host}/api/v2/demo/ws?demo_id={demo_id}"

@router.post("/start")
async def start_demo(request: Request, scenario: str = "crisis_455pm"):
    """
    启动Demo
    返回 demo_id 和 WebSocket URL
    """
    demo_id = str(uuid.uuid4())
    logger.info(f"Starting demo session: {demo_id} for scenario: {scenario}")
    
    controller = CrisisAutoPlayController()
    active_sessions[demo_id] = controller
    
    # Generate the correct WebSocket URL based on the request
    websocket_url = get_websocket_url(request, demo_id)

    return {
        "demo_id": demo_id,
        "status": "started",
        "websocket_url": websocket_url,
        "duration_seconds": 178
    }

@router.websocket("/ws")
async def websocket_demo(websocket: WebSocket, demo_id: str):
    """
    WebSocket连接处理
    """
    await websocket.accept()
    logger.info(f"WebSocket connected for demo_id: {demo_id}")

    controller = active_sessions.get(demo_id)
    if not controller:
        logger.warning(f"Demo session not found: {demo_id}")
        await websocket.close(code=1008, reason="Invalid demo_id")
        return

    demo_task = None
    
    try:
        # Loop to handle commands from client (e.g., "play", "confirm")
        while True:
            data = await websocket.receive_json()
            logger.info(f"Received command: {data}")
            
            if data.get("action") == "play":
                if not controller.is_playing:
                    controller.is_playing = True
                    # 在后台任务中运行demo序列，这样主循环可以继续接收消息
                    demo_task = asyncio.create_task(controller.run_demo_sequence(websocket))
                    logger.info("Demo sequence started in background")
            elif data.get("action") == "confirm":
                # 用户确认决策（Approve/Override/Details）
                confirmation_type = data.get("confirmation_type", "approve")
                logger.info(f"User confirmed decision: {confirmation_type}")
                controller.confirm_decision(confirmation_type)
            elif data.get("action") == "ping":
                await websocket.send_json({"type": "pong"})

    except WebSocketDisconnect:
        logger.info(f"WebSocket disconnected: {demo_id}")
        if demo_id in active_sessions:
            del active_sessions[demo_id]
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        try:
            await websocket.close(code=1011)
        except:
            pass
    finally:
        # 取消后台任务
        if demo_task and not demo_task.done():
            demo_task.cancel()
        if demo_id in active_sessions:
            del active_sessions[demo_id]
