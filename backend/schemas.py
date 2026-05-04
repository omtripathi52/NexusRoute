# ========== Data Models (New) ==========

class HumanMessageRequest(BaseModel):
    """Human message request"""
    conversation_id: int
    content: str
    agent_name: str = "Human Agent"

class UpdateHandoffRequest(BaseModel):
    """Update handoff status request"""
    status: str  # pending/processing/completed
    agent_name: Optional[str] = None
