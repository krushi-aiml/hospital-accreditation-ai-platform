from fastapi import APIRouter
from sqlalchemy import text
from database.db import engine
import os
import json

router = APIRouter()


@router.get("/analyze")
def analyze():

    upload_folder = "uploads"

    if not os.path.exists(upload_folder):
        return {
            "compliance_score": 0,
            "audit_rank": "N/A",
            "readiness_level": "No Analysis",
            "matched": [],
            "missing": [],
            "recommendations": [],
            "message": "Uploads folder not found."
        }

    files = os.listdir(upload_folder)

    if len(files) == 0:
        return {
            "compliance_score": 0,
            "audit_rank": "N/A",
            "readiness_level": "No Analysis",
            "matched": [],
            "missing": [],
            "recommendations": [],
            "message": "No uploaded documents found."
        }

    latest_file = max(
        [os.path.join(upload_folder, f) for f in files],
        key=os.path.getctime
    )

    current_file = os.path.basename(latest_file)

    print("Analyzing:", current_file)

    with engine.connect() as conn:

        analysis = conn.execute(
            text("""
                SELECT
                    compliance_score,
                    matched,
                    missing,
                    recommendations
                FROM analysis_results
                WHERE file_name = :file_name
            """),
            {
                "file_name": current_file
            }
        ).fetchone()

    if not analysis:
        return {
            "compliance_score": 0,
            "audit_rank": "N/A",
            "readiness_level": "No Analysis",
            "matched": [],
            "missing": [],
            "recommendations": [],
            "message": "Analysis not found. Please upload the document again."
        }

    score = float(analysis.compliance_score)

    matched = json.loads(analysis.matched or "[]")
    missing = json.loads(analysis.missing or "[]")
    recommendations = json.loads(analysis.recommendations or "[]")

    if score == 100:
        audit_rank = "★★★★★"
        readiness_level = "Level 5 - Fully Compliant"

    elif score >= 80:
        audit_rank = "★★★★☆"
        readiness_level = "Level 4 - Mostly Compliant"

    elif score >= 60:
        audit_rank = "★★★☆☆"
        readiness_level = "Level 3 - Moderately Compliant"

    elif score >= 40:
        audit_rank = "★★☆☆☆"
        readiness_level = "Level 2 - Needs Improvement"

    else:
        audit_rank = "★☆☆☆☆"
        readiness_level = "Level 1 - High Risk"

    with engine.connect() as conn:

        latest_record = conn.execute(
            text("""
                SELECT file_name
                FROM audit_history
                ORDER BY id DESC
                LIMIT 1
            """)
        ).fetchone()

        if not latest_record or latest_record.file_name != current_file:

            conn.execute(
                text("""
                    INSERT INTO audit_history
                    (
                        file_name,
                        compliance_score,
                        matched_count,
                        missing_count
                    )
                    VALUES
                    (
                        :file_name,
                        :score,
                        :matched,
                        :missing
                    )
                """),
                {
                    "file_name": current_file,
                    "score": score,
                    "matched": len(matched),
                    "missing": len(missing)
                }
            )

            conn.commit()

    return {
        "compliance_score": score,
        "audit_rank": audit_rank,
        "readiness_level": readiness_level,
        "matched": matched,
        "missing": missing,
        "recommendations": recommendations
    }