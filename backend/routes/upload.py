from fastapi import APIRouter, UploadFile, File
import shutil
import os
import json

from sqlalchemy import text
from database.db import engine

from services.document_reader import extract_text
from services.summary_service import generate_summary
from services.audit_agent import audit_agent

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # Delete old uploaded file
    for old_file in os.listdir(UPLOAD_FOLDER):

        old_path = os.path.join(
            UPLOAD_FOLDER,
            old_file
        )

        if os.path.isfile(old_path):
            os.remove(old_path)

    # Save new file
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract document text
    document_text = extract_text(file_path)

    print("DOCUMENT LENGTH:", len(document_text))
    print(document_text[:500])

    # Generate summary
    summary = generate_summary(document_text)

    # Run AI analysis ONLY ONCE
    result = audit_agent.invoke(
        {
            "file_path": file_path
        }
    )

    matched = result["matched"]
    missing = result["missing"]
    recommendations = result["recommendations"]
    standards = result["standards"]

    score = 0

    if len(standards) > 0:
        score = round(
            (len(matched) / len(standards)) * 100,
            2
        )

    # Save everything to PostgreSQL
    with engine.connect() as conn:

        # Save summary
        conn.execute(
            text("""
                INSERT INTO document_summaries
                (
                    file_name,
                    summary
                )
                VALUES
                (
                    :file_name,
                    :summary
                )
            """),
            {
                "file_name": file.filename,
                "summary": summary
            }
        )

        # Save analysis
        conn.execute(
            text("""
                INSERT INTO analysis_results
                (
                    file_name,
                    compliance_score,
                    matched,
                    missing,
                    recommendations
                )
                VALUES
                (
                    :file_name,
                    :score,
                    :matched,
                    :missing,
                    :recommendations
                )
                ON CONFLICT (file_name)
                DO UPDATE SET
                    compliance_score = EXCLUDED.compliance_score,
                    matched = EXCLUDED.matched,
                    missing = EXCLUDED.missing,
                    recommendations = EXCLUDED.recommendations
            """),
            {
                "file_name": file.filename,
                "score": score,
                "matched": json.dumps(matched),
                "missing": json.dumps(missing),
                "recommendations": json.dumps(recommendations)
            }
        )

        conn.commit()

    return {
        "message": "File uploaded successfully",
        "filename": file.filename
    }