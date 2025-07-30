from fastapi import FastAPI
from superduper import superduper
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_methods=["*"], allow_headers=["*"])

class ConnectionRequest(BaseModel):
  conn_string: str

@app.post("/connect")
async def connect_db(request: ConnectionRequest):
  try:
    db = superduper(request.conn_string)
    return {"status": "connected"}
  except Exception as e:
    return {"status": "error", "message": str(e)}