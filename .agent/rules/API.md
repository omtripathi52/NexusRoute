---
trigger: always_on
---

# API Key Security Rules for NexusRoute

## Required Secret Storage

- Gemini key must be loaded from `GEMINI_API_KEY`.
- Never commit API keys in source code, `.env.example`, or docs.

## Coding Rules

1. Never hardcode secrets.
2. Read secrets using `os.getenv()` (or equivalent settings loader).
3. Validate required keys at startup and fail fast with a clear message.
4. Keep provider calls wrapped in service/config layers (do not scatter key access).

## Error Handling Rules

- If a key is missing, return a safe and actionable error.
- Do not print raw keys in logs, tracebacks, or API responses.

## Recommended Pattern

```python
import os

def get_api_key(service_name: str) -> str:
    key = os.getenv(f"{service_name.upper()}_API_KEY")
    if not key:
        raise ValueError(f"Missing environment variable: {service_name.upper()}_API_KEY")
    return key
```

## Defense-in-Depth Guidance

### 1. Safe Client Wrapper

```python
import os
import hashlib

class SecureAPIClient:
    def __init__(self, service_name: str):
        self.service_name = service_name
        self.api_key = self._load_key()

    def _load_key(self) -> str:
        env_var = f"{self.service_name.upper()}_API_KEY"
        key = os.getenv(env_var)
        if not key:
            raise ValueError(f"Set environment variable {env_var} before startup")

        key_hash = hashlib.sha256(key.encode()).hexdigest()[:8]
        print(f"[Security] {self.service_name} key loaded (hash suffix: ...{key_hash})")
        return key
```

### 2. Environment Validation Script

```python
import os

REQUIRED_KEYS = ["GEMINI_API_KEY"]

def check_environment() -> bool:
    missing = [k for k in REQUIRED_KEYS if not os.getenv(k)]
    if missing:
        print("Missing required environment variables:")
        for key in missing:
            print(f"- {key}")
        return False
    print("All required API keys are configured")
    return True
```

### 3. Boolean Presence Check (No Key Exposure)

```python
print("GEMINI_API_KEY configured:", bool(os.getenv("GEMINI_API_KEY")))
```
