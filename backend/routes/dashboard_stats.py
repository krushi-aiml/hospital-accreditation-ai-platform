from fastapi import APIRouter
from sqlalchemy import text
from database.db import engine

router = APIRouter()


@router.get("/dashboard-stats")
def dashboard_stats():

    with engine.connect() as conn:

        total_uploads = conn.execute(
            text("""
                SELECT COUNT(*)
                FROM document_summaries
            """)
        ).scalar()

        total_analyses = conn.execute(
            text("""
                SELECT COUNT(*)
                FROM audit_history
            """)
        ).scalar()

        average_score = conn.execute(
    text("""
        SELECT
        COALESCE(
            AVG(compliance_score),
            0
        )
        FROM audit_history
    """)
).scalar()

        total_summaries = conn.execute(
            text("""
                SELECT COUNT(*)
                FROM document_summaries
            """)
        ).scalar()

        recent_audits = conn.execute(
            text("""
                SELECT
                    file_name,
                    compliance_score,
                    audit_date
                FROM audit_history
                ORDER BY audit_date DESC
                LIMIT 5
            """)
        ).fetchall()

        latest_document = conn.execute(
            text("""
                SELECT
                    file_name,
                    created_at
                FROM document_summaries
                ORDER BY created_at DESC
                LIMIT 1
            """)
        ).fetchone()

    return {
        "total_uploads": total_uploads,
        "total_analyses": total_analyses,
        "average_score": average_score,
        "total_summaries": total_summaries,

        "recent_audits": [
            {
                "file_name": row.file_name,
                "score": row.compliance_score,
                "date": str(row.audit_date)
            }
            for row in recent_audits
        ],

        "latest_document":
        {
            "file_name": latest_document.file_name,
            "created_at": str(latest_document.created_at)
        }
        if latest_document
        else None
    }