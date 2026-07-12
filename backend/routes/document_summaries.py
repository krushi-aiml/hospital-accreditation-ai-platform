from fastapi import APIRouter
from sqlalchemy import text
from database.db import engine

router = APIRouter()


@router.get("/document-summaries")
def get_document_summaries():

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    id,
                    file_name,
                    summary,
                    created_at
                FROM document_summaries
                ORDER BY created_at DESC
            """)
        )

        rows = result.fetchall()

    summaries = []

    for row in rows:

        summaries.append(
            {
                "id": row.id,
                "file_name": row.file_name,
                "summary": row.summary,
                "created_at": str(row.created_at)
            }
        )

    return summaries


@router.delete("/clear-summaries")
def clear_summaries():

    with engine.connect() as conn:

        conn.execute(
            text("""
                DELETE FROM document_summaries
            """)
        )

        conn.commit()

    return {
        "message": "All summaries cleared successfully"
    }