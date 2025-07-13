from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HOP_BY_HOP_HEADERS = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "registry-proxy"}

@app.api_route("/proxy/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"])
async def proxy(full_path: str, request: Request):
    registry_url = request.query_params.get("registry_url")
    if not registry_url:
        return Response("Missing registry_url", status_code=400)
    
    target_url = f"{registry_url.rstrip('/')}/{full_path}"
    method = request.method
    headers = dict(request.headers)
    headers.pop("host", None)
    body = await request.body()
    
    async with httpx.AsyncClient() as client:
        proxy_resp = await client.request(
            method=method,
            url=target_url,
            headers=headers,
            content=body
        )
    
    expose = [
        "Docker-Distribution-Api-Version",
        "Content-Length",
        "Content-Type"
    ]
    
    response_headers = {
        k: v for k, v in proxy_resp.headers.items()
        if k.lower() not in HOP_BY_HOP_HEADERS
    }
    response_headers["Access-Control-Expose-Headers"] = ", ".join(expose)
    
    return Response(
        content=proxy_resp.content,
        status_code=proxy_resp.status_code,
        headers=response_headers,
        media_type=proxy_resp.headers.get("content-type"),
    )