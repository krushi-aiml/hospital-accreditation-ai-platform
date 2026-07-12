from services.chroma_service import retrieve_standards

query = """
Ambulance personnel shall possess
valid qualifications, certifications,
and training.
"""

results = retrieve_standards(query)

print(results)