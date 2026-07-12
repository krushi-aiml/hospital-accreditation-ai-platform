from fastapi import APIRouter
from sqlalchemy import text
from database.db import engine

router = APIRouter()

@router.get("/standards")
def get_standards():

    conn = engine.connect()

    result = conn.execute(
        text("SELECT * FROM standard LIMIT 100")
    )

    data = []

    for row in result:
        data.append(dict(row._mapping))

    conn.close()

    return data