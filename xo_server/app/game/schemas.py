from app.schemas.base import BaseSchema


class GameCreateSchema(BaseSchema):
    moves_number: int = 0
    is_finished: bool = False


class GameReadSchema(BaseSchema):
    id: int
    moves_number: int
    is_finished: bool

