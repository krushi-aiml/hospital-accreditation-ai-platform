from fastapi import APIRouter
from sqlalchemy import text
from database.db import engine

router = APIRouter()

@router.get("/gapanalysis")
def get_gap_analysis():

    conn = engine.connect()

    result = conn.execute(
        text("SELECT * FROM gapanalysis")
    )

    data = []

    for row in result:
        data.append(dict(row._mapping))

    conn.close()

    return data