from sqlalchemy import text
from database.db import engine


def get_standards_by_category(category):

    with engine.connect() as conn:

        rows = conn.execute(
            text("""
                SELECT requirement
                FROM standard
                WHERE category = :category
            """),
            {"category": category}
        ).fetchall()

    return [row[0] for row in rows]