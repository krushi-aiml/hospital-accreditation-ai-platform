from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload import router as upload_router
from routes.standards import router as standards_router
from routes.evidence import router as evidence_router
from routes.mappings import router as mappings_router
from routes.gapanalysis import router as gapanalysis_router
from routes.dashboard_stats import router as dashboard_stats_router
from fastapi.staticfiles import StaticFiles
from routes.documents import router as documents_router
from routes.analyze import router as analyze_router
from routes.report_pdf import router as report_pdf_router
from routes.chatbot import router as chatbot_router
from routes.download_summary import router as download_summary_router
from routes.audit_history import router as audit_history_router
from routes.chroma_routes import router as chroma_router
from routes.document_summaries import router as document_summaries_router
from routes.auth import router as auth_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(standards_router)
app.include_router(evidence_router)
app.include_router(mappings_router)
app.include_router(gapanalysis_router)
app.include_router(dashboard_stats_router)
app.include_router(documents_router)
app.include_router(analyze_router)
app.include_router(report_pdf_router)
app.include_router(chatbot_router)
app.include_router(audit_history_router)
app.include_router(download_summary_router)
app.include_router(document_summaries_router)
app.include_router(chroma_router)
app.include_router(auth_router)
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)
@app.get("/")
def home():
    return {
        "message": "Hospital Accreditation AI Backend Running"
    }