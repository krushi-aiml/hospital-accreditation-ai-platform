from services.chatbot_service import ask_ai


def generate_recommendations(missing_standards):

    if not missing_standards:
        return [
            "No compliance gaps identified."
        ]

    prompt = f"""
You are a NABH Hospital Accreditation Consultant.

Below are missing accreditation standards.

Generate practical recommendations to help the hospital become compliant.

IMPORTANT RULES:

- Do NOT repeat the missing standard.
- Explain WHAT the hospital should implement.
- Each recommendation must start with an action verb.
- Keep each recommendation under 20 words.
- Maximum 5 recommendations.
- One recommendation per line.
- No numbering.
- No headings.
- No introduction.
- No conclusion.

Missing Standards:

{chr(10).join(missing_standards)}
"""

    response = ask_ai(
        prompt,
        ""
    )

    return [
        line.strip()
        for line in response.split("\n")
        if line.strip()
    ]