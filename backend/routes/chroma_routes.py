from fastapi import APIRouter
from services.chroma_service import load_standards

router = APIRouter()

@router.get("/load-standards")
def load():
    return {
        "message": load_standards()
    }