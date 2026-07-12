from fastapi import APIRouter
from sqlalchemy import text
from database.db import engine

router = APIRouter()

@router.get("/evidence")
def get_evidence():

    conn = engine.connect()

    result = conn.execute(
        text("SELECT * FROM evidence")
    )

    data = []

    for row in result:
        data.append(dict(row._mapping))

    conn.close()

    return data