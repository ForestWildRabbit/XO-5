from datetime import timedelta

from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_NAME = os.getenv("DB_NAME")
DB_PASS = os.getenv("DB_PASS")
DB_PORT = os.getenv("DB_PORT")

DB_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

SECRET_KEY = os.getenv("SECRET_KEY")


class AuthJWT:
    access_token_type: str = 'access'
    refresh_token_type: str = 'refresh'
    access_token_expires_in: timedelta = timedelta(minutes=60)
    refresh_token_expires_in: timedelta = timedelta(days=60)
