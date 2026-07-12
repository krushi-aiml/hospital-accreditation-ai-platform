from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def find_matches(document_text, standards):

    paragraphs = [
        p.strip()
        for p in document_text.split("\n")
        if len(p.strip()) > 20
    ]

    matched = []
    missing = []

    for standard in standards:

        standard_embedding = model.encode(
            standard,
            convert_to_tensor=True
        )

        highest_score = 0

        for paragraph in paragraphs:

            paragraph_embedding = model.encode(
                paragraph,
                convert_to_tensor=True
            )

            score = cos_sim(
                standard_embedding,
                paragraph_embedding
            ).item()

            highest_score = max(
                highest_score,
                score
            )

        if highest_score >= 0.70:

            matched.append(standard)

        else:

            missing.append(standard)

    return {
        "matched": matched,
        "missing": missing
    }