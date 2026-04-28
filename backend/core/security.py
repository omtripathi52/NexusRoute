import os
import logging
import jwt
from typing import Optional, Dict, Any
from jwt import PyJWKClient
from functools import lru_cache

logger = logging.getLogger(__name__)

class AuthError(Exception):
    def __init__(self, error: str, status_code: int = 401):
        self.error = error
        self.status_code = status_code

@lru_cache()
def get_jwks_client():
    from config import get_settings
    settings = get_settings()
    clerk_issuer_url = settings.clerk_issuer_url
    if not clerk_issuer_url:
        logger.warning("CLERK_ISSUER_URL not set. Fallback authentication will be used.")
        return None
    jwks_url = f"{clerk_issuer_url}/.well-known/jwks.json"
    return PyJWKClient(jwks_url)

def verify_token(token: str) -> Dict[str, Any]:
    """
    Verify the JWT token using Clerk's JWKS.
    Returns the decoded token payload if valid.
    If Clerk is not configured, raises an AuthError that the caller can handle.
    """
    jwks_client = get_jwks_client()
    if not jwks_client:
         raise AuthError("Authentication service unavailable", 503)

    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        data = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={"verify_signature": True, "verify_exp": True}
        )
        return data

    except jwt.exceptions.ExpiredSignatureError:
        raise AuthError("Token has expired")
    except jwt.exceptions.DecodeError:
        raise AuthError("Token decode error")
    except jwt.exceptions.InvalidTokenError as e:
        raise AuthError(f"Invalid token: {str(e)}")
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        raise AuthError("Authentication failed")
