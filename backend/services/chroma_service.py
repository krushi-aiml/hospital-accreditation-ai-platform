import chromadb
from sentence_transformers import SentenceTransformer
from sqlalchemy import text
from database.db import engine

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="hospital_standards"
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def load_standards():

    conn = engine.connect()

    rows = conn.execute(
        text(
            """
            SELECT standard_id, requirement
            FROM standard
            """
        )
    ).fetchall()

    conn.close()

    for row in rows:

        standard_id = str(row[0])

        requirement = row[1]

        embedding = model.encode(
            requirement
        ).tolist()

        collection.upsert(
            ids=[standard_id],
            documents=[requirement],
            embeddings=[embedding]
        )

    return "Standards loaded successfully"


def retrieve_standards(query_text):

    query_embedding = model.encode(
        query_text
    ).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=20
    )

    return results