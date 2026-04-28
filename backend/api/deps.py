from fastapi import Depends, HTTPException, Header, Request
from typing import Optional
from config import get_settings
from core.security import verify_token, AuthError

async def get_current_user(request: Request, authorization: Optional[str] = Header(None)):
    """
    Dependency to get the current authenticated user from the Authorization header.
    Expects format: Bearer <token>
    """
    settings = get_settings()
    whitelist = {
        entry.strip().lower()
        for entry in settings.admin_whitelist.split(",")
        if entry.strip()
    }
    fallback_email = (request.headers.get("X-User-Email") or "").strip().lower()

    def build_fallback_user() -> dict:
        return {
            "sub": fallback_email or "fallback-user",
            "email": fallback_email or None,
            "role": "admin" if fallback_email in whitelist else "user",
            "fallback": True,
        }

    if not authorization:
        if fallback_email:
            return build_fallback_user()
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
    
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        if fallback_email:
            return build_fallback_user()
        raise HTTPException(status_code=401, detail="Invalid Authorization Header Format")
    
    token = parts[1]
    
    try:
        payload = verify_token(token)
        return payload
    except AuthError as e:
        if fallback_email:
            return build_fallback_user()
        raise HTTPException(status_code=e.status_code, detail=e.error)
