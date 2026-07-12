from fastapi import APIRouter, HTTPException
import os

router = APIRouter()

@router.get("/documents")
def get_documents():

    files = os.listdir("uploads")

    documents = []

    for file in files:
        documents.append({
            "name": file,
            "status": "Uploaded"
        })

    return documents


@router.delete("/documents/{filename}")
def delete_document(filename: str):

    file_path = f"uploads/{filename}"

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    os.remove(file_path)

    return {
        "message": "File deleted successfully"
    }