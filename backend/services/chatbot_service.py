import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
HF_MODEL = os.getenv("HF_MODEL")
print("HF_TOKEN:", HF_TOKEN)

client = InferenceClient(
    api_key=HF_TOKEN
)


def ask_ai(question: str, context: str):

    try:

        response = client.chat.completions.create(
            model=HF_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": context
                },
                {
                    "role": "user",
                    "content": f"""
Answer ONLY using the uploaded policy.

Question:
{question}

If the answer is not available in the policy,
reply:
"This information is not available in the uploaded policy."
"""
                }
            ],
            max_tokens=500
        )

        return response.choices[0].message.content

    except Exception as e:

        print("FULL ERROR:")
        print(repr(e))

        return str(e)