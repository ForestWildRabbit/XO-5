from fastapi import FastAPI, APIRouter
from app.game.routers import game_router

app = FastAPI(root_path="/api")

base_router = APIRouter()
base_router.include_router(game_router)
app.include_router(base_router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
