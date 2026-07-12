from fastapi import APIRouter
from fastapi.responses import FileResponse
from datetime import datetime
import os

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib import colors
from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle
)

from services.audit_agent import audit_agent

router = APIRouter()


@router.get("/download-report")
def download_report():

    upload_folder = "uploads"

    files = os.listdir(upload_folder)

    if not files:
        return {
            "message": "No uploaded documents found"
        }

    latest_file = max(
        [os.path.join(upload_folder, f) for f in files],
        key=os.path.getctime
    )

    result = audit_agent.invoke(
        {
            "file_path": latest_file
        }
    )

    matched = result["matched"]
    missing = result["missing"]
    recommendations = result["recommendations"]
    standards = result["standards"]

    compliance_score = round(
        (len(matched) / len(standards)) * 100,
        2
    )

    if compliance_score >= 80:
        risk_level = "Low Risk"
        score_color = colors.green

    elif compliance_score >= 50:
        risk_level = "Medium Risk"
        score_color = colors.orange

    else:
        risk_level = "High Risk"
        score_color = colors.red

    # -------------------------
    # Audit Rank
    # -------------------------

    if compliance_score == 100:
        audit_rank = "5 / 5"
        level = "Level 5"
        status = "Fully Compliant"

    elif compliance_score >= 80:
        audit_rank = "4 / 5"
        level = "Level 4"
        status = "Mostly Compliant"

    elif compliance_score >= 60:
        audit_rank = "3 / 5"
        level = "Level 3"
        status = "Moderately Compliant"

    elif compliance_score >= 40:
        audit_rank = "2 / 5"
        level = "Level 2"
        status = "Needs Improvement"

    else:
        audit_rank = "1 / 5"
        level = "Level 1"
        status = "High Risk"

    current_date = datetime.now().strftime("%d-%m-%Y")

    pdf_file = "Accreditation_Report.pdf"

    doc = SimpleDocTemplate(
        pdf_file,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "TitleStyle",
        parent=styles["Title"],
        textColor=colors.darkblue
    )

    score_style = ParagraphStyle(
        "ScoreStyle",
        parent=styles["Heading1"],
        textColor=score_color
    )

    green_style = ParagraphStyle(
        "GreenStyle",
        parent=styles["Heading2"],
        textColor=colors.green
    )

    red_style = ParagraphStyle(
        "RedStyle",
        parent=styles["Heading2"],
        textColor=colors.red
    )

    blue_style = ParagraphStyle(
        "BlueStyle",
        parent=styles["Heading2"],
        textColor=colors.darkblue
    )

    gold_style = ParagraphStyle(
        "GoldStyle",
        parent=styles["Heading1"],
        textColor=colors.HexColor("#D4AF37"),
        alignment=1
    )

    content = [

    Paragraph(
        "HOSPITAL ACCREDITATION COMPLIANCE REPORT",
        title_style
    ),

    Spacer(1, 10),

    Paragraph(
        f"<b>Generated Date:</b> {current_date}",
        styles["Normal"]
    ),

    Paragraph(
        f"<b>Risk Level:</b> {risk_level}",
        styles["Normal"]
    ),

    Spacer(1, 15),

    Paragraph(
        f"Compliance Score : {compliance_score}%",
        score_style
    ),

    Spacer(1, 12),

    Paragraph(
    "AUDIT READINESS",
    blue_style
),

Spacer(1,8),

Paragraph(
    f"<b>Rank :</b> {audit_rank}",
    styles["BodyText"]
),

Paragraph(
    f"<b>Level :</b> {level}",
    styles["BodyText"]
),

Paragraph(
    f"<b>Status :</b> {status}",
    styles["BodyText"]
),

Spacer(1,20),

    Paragraph(
        "COMPLIANT STANDARDS",
        green_style
    ),

    Spacer(1, 8)

]

    
    if matched:

        for item in matched:

            content.append(
                Paragraph(
                    f"✓ {item}",
                    styles["Normal"]
                )
            )

    else:

        content.append(
            Paragraph(
                "No compliant standards identified.",
                styles["Normal"]
            )
        )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "NON-COMPLIANT STANDARDS",
            red_style
        )
    )

    content.append(
        Spacer(1, 8)
    )

    if missing:

        for item in missing:

            content.append(
                Paragraph(
                    f"✗ {item}",
                    styles["Normal"]
                )
            )

    else:

        content.append(
            Paragraph(
                "No missing standards detected.",
                styles["Normal"]
            )
        )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "AI RECOMMENDATIONS",
            blue_style
        )
    )

    content.append(
        Spacer(1, 8)
    )

    if recommendations:

        for item in recommendations:

            content.append(
                Paragraph(
                    f"• {item}",
                    styles["Normal"]
                )
            )

    else:

        content.append(
            Paragraph(
                "No recommendations required.",
                styles["Normal"]
            )
        )


    content.append(
        Spacer(1, 25)
    )

    content.append(
        Paragraph(
            """
            <b>Generated by Hospital Accreditation AI Platform</b>
            <br/>
            This report is automatically generated using AI-driven
            compliance assessment and accreditation readiness analysis.
            """,
            styles["Italic"]
        )
    )

    doc.build(content)

    return FileResponse(
        pdf_file,
        media_type="application/pdf",
        filename=pdf_file
    )