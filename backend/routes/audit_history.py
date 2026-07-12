from fastapi import APIRouter
from sqlalchemy import text
from database.db import engine

router = APIRouter()


@router.get("/audit-history")
def get_audit_history():

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    id,
                    audit_date,
                    file_name,
                    compliance_score,
                    matched_count,
                    missing_count
                FROM audit_history
                ORDER BY audit_date DESC
            """)
        )

        rows = result.fetchall()

    history = []

    for row in rows:

        history.append(
            {
                "id": row.id,
                "audit_date": str(row.audit_date),
                "file_name": row.file_name,
                "compliance_score": row.compliance_score,
                "matched_count": row.matched_count,
                "missing_count": row.missing_count
            }
        )

    return history


@router.delete("/clear-history")
def clear_history():

    with engine.connect() as conn:

        conn.execute(
            text("""
                DELETE FROM audit_history
            """)
        )

        conn.commit()

    return {
        "message": "Audit history cleared successfully"
    }