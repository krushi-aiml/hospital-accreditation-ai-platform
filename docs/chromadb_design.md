# ChromaDB Design

Collection Name:
hospital_policies

Stores:
- Document Chunks
- Embeddings
- Metadata

Metadata Example:

{
  "document_id": 1,
  "chunk_number": 2,
  "file_name": "infection_policy.pdf"
}

Workflow:

PDF Upload
↓
Text Extraction
↓
Chunking
↓
Embedding Generation
↓
Store in ChromaDB
↓
Semantic Search