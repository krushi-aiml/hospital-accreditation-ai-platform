from services.chatbot_service import ask_ai


def generate_summary(document_text):

    prompt = """
You are a Hospital Accreditation Compliance Expert.

Read ONLY the uploaded policy document.

Generate the summary in EXACTLY this format.

Policy Name:
<Policy Name>

Purpose:
Write 2-3 sentences explaining the purpose of the policy. If a Purpose section is not explicitly written, infer it from the policy content. Never leave this section blank.

Key Areas Covered:
• Point 1
• Point 2
• Point 3

Compliance Highlights:
• Point 1
• Point 2
• Point 3

Overall Assessment:
Write a short assessment of the policy.

Rules:
- Use only information from the uploaded document.
- Never leave any heading empty.
- Do not invent policy names.
- Do not write N/A or blank values.
- If the document contains enough information, infer the purpose from the policy objectives.
"""
    return ask_ai(
        prompt,
        document_text[:4000]
    )