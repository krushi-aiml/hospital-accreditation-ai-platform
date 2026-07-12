from fastapi import APIRouter
from pydantic import BaseModel
from services.document_reader import extract_text
from services.chatbot_service import ask_ai
from services.audit_agent import audit_agent
import os

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    upload_folder = "uploads"

    files = os.listdir(upload_folder)

    if not files:
        return {
            "answer": "No uploaded document found."
        }

    latest_file = max(
        [os.path.join(upload_folder, f) for f in files],
        key=os.path.getctime
    )

    # Extract document text
    document_text = extract_text(latest_file)

    print("CHAT DOCUMENT LENGTH:", len(document_text))

    # Run compliance analysis
    result = audit_agent.invoke(
        {
            "file_path": latest_file
        }
    )

    compliance_score = 0

    if len(result["standards"]) > 0:
        compliance_score = round(
            (len(result["matched"]) / len(result["standards"])) * 100,
            2
        )

    # Build AI context
    context = f"""
You are a Hospital Accreditation Compliance Expert.

Use ONLY the information provided below.

Document Content:
{document_text[:6000]}

Compliance Score:
{compliance_score}%

Matched Standards:
{result["matched"]}

Missing Standards:
{result["missing"]}

Recommendations:
{result["recommendations"]}

IMPORTANT:
- Answer ONLY from the uploaded policy.
- Do not use external knowledge.
- If the answer is not found in the policy, reply:
"This information is not available in the uploaded policy."
"""

    answer = ask_ai(
        request.question,
        context
    )

    return {
        "answer": answer
    }