from fastapi import FastAPI
from superduper import superduper
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_methods=["*"], allow_headers=["*"])

class ConnectionRequest(BaseModel):
    conn_string: str

class PredictionRequest(BaseModel):
    model: str
    input: str

@app.post("/connect")
async def connect_db(request: ConnectionRequest):
    try:
        db = superduper(request.conn_string)
        return {"status": "connected"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/predict")
async def run_prediction(request: PredictionRequest):
    try:
        output = f"Mock prediction for {request.model} on {request.input}"
        return {"status": "success", "output": output}
    except Exception as e:
        return {"status": "error", "message": str(e)}