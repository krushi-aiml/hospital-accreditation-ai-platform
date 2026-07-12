from langgraph.graph import StateGraph, END
from typing import TypedDict, List
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from services.document_reader import extract_text
from services.ai_matcher import find_matches
from services.chroma_service import retrieve_standards
from services.recommendation_service import generate_recommendations
from services.standard_service import get_standards_by_category
import os
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# ----------------------------
# STATE (shared memory)
# ----------------------------
class AuditState(TypedDict):
    file_path: str
    document_text: str
    standards: List[str]
    matched: List[str]
    missing: List[str]
    recommendations: List[str]


# ----------------------------
# NODE 1: Read Document
# ----------------------------
def read_document(state: AuditState):

    text = extract_text(state["file_path"])

    return {
        "document_text": text
    }


# ----------------------------
# NODE 2: Retrieve Standards (RAG)
# ----------------------------
def retrieve(state):

    filename = state["file_path"].upper()

    if "AMBULANCE SERVICE" in filename:
        category = "Ambulance Service Policy"

    elif "BIOMEDICAL WASTE MANAGEMENT" in filename:
        category = "Biomedical Waste Management"

    elif "BLOOD BANK MANAGEMENT" in filename:
        category = "Blood Bank Management"

    elif "EMERGENCY PREPAREDNESS" in filename:
        category = "Emergency Preparedness"

    elif "FIRE SAFETY" in filename:
        category = "Fire Safety"

    elif "HUMAN RESOURCE TRAINING" in filename:
        category = "Human Resource Training"

    elif "ICU MANAGEMENT" in filename:
        category = "ICU Management"

    elif "INFECTION CONTROL" in filename:
        category = "Infection Control"

    elif "LABORATORY SAFETY" in filename:
        category = "Laboratory Safety"

    elif "MEDICAL RECORDS MANAGEMENT" in filename:
        category = "Medical Records Management"

    elif "MEDICATION SAFETY" in filename:
        category = "Medication Safety"

    elif "OPERATION THEATRE" in filename:
        category = "Operation Theatre"

    elif "PATIENT RIGHTS AND RESPONSIBILITIES" in filename:
        category = "Patient Rights and Responsibilities"

    elif "PATIENT SAFETY" in filename:
        category = "Patient Safety"

    elif "QUALITY ASSURANCE" in filename:
        category = "Quality Assurance"

    elif "SURGICAL CARE OF PATIENTS" in filename:
        category = "Surgical Care of Patients"

    elif "EQUIPMENT MAINTENANCE" in filename:
        category = "Equipment Maintenance"

    elif "DISCHARGE MANAGEMENT" in filename:
        category = "Discharge Management"

    else:
        category = None

    print("FILE NAME:", filename)
    print("CATEGORY:", category)

    standards = get_standards_by_category(category)

    return {
        "standards": standards
    }

# ----------------------------
# NODE 3: Gap Analysis (CORE AI LOGIC)
# ----------------------------
def analyze_gaps(state: AuditState):

    result = find_matches(
        state["document_text"],
        state["standards"]
    )

    return {
        "matched": result["matched"],
        "missing": result["missing"]
    }

# ----------------------------
# NODE 4: AI Recommendations
# ----------------------------
def recommend(state: AuditState):

    recommendations = generate_recommendations(state["missing"])

    return {
        "recommendations": recommendations
    }


# ----------------------------
# BUILD GRAPH
# ----------------------------
graph = StateGraph(AuditState)

graph.add_node("read_document", read_document)
graph.add_node("retrieve", retrieve)
graph.add_node("analyze_gaps", analyze_gaps)
graph.add_node("recommend", recommend)

graph.set_entry_point("read_document")

graph.add_edge("read_document", "retrieve")
graph.add_edge("retrieve", "analyze_gaps")
graph.add_edge("analyze_gaps", "recommend")
graph.add_edge("recommend", END)

audit_agent = graph.compile()