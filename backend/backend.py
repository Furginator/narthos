from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ConnectionRequest(BaseModel):
    conn_string: str

class PredictionRequest(BaseModel):
    model: str
    input: str

@app.post("/connect")
async def connect_db(request: ConnectionRequest):
    try:
        client = MongoClient(request.conn_string)
        client.server_info()  # Test connection
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

@app.get("/stats")
async def get_stats():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["narthos_db"]
        return {
            "connectedDatabase": "narthos_db",
            "activeModels": 5,
            "componentsLoaded": 3,
            "predictionsRun": 10
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}