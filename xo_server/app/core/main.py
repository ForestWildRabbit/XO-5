from fastapi import FastAPI, APIRouter
from app.game.routers import game_router
from app.user.routers import user_router
from app.auth.routers import auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(root_path="/api")

base_router = APIRouter()
base_router.include_router(game_router)
base_router.include_router(user_router)
base_router.include_router(auth_router)
app.include_router(base_router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
