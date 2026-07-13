# 🏥 Hospital Accreditation AI Platform

An AI-powered platform that helps hospitals assess compliance with accreditation standards by analyzing policy documents, generating AI-based summaries, answering user queries, and providing compliance recommendations.

---

## 📌 Project Overview

The Hospital Accreditation AI Platform simplifies the accreditation process by enabling hospitals to upload policy documents and automatically analyze them using AI.

The system performs document summarization, compliance analysis, intelligent recommendations, and AI-powered question answering to improve accreditation readiness.

---

## ✨ Features

- 🔐 User Authentication (Signup, Login, Forgot Password, OTP Verification)
- 📄 Upload Hospital Policy Documents
- 🤖 AI Document Summarization
- 📊 Compliance Score Dashboard
- 📋 AI-Based Compliance Analysis
- 💡 AI Recommendations
- 💬 AI Chatbot for Policy Questions
- 📑 Accreditation Report Generation (PDF)
- 📜 Audit History
- 📁 Document Management

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- CSS
- JavaScript

### Backend
- FastAPI
- Python
- Uvicorn

### Database
- PostgreSQL
- ChromaDB (Vector Database)

### AI & NLP
- Hugging Face Inference API
- Meta-Llama Model
- Sentence Transformers
- Retrieval-Augmented Generation (RAG)

---

## 📂 Project Structure

```
hospital-accreditation-ai/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── database/
│   ├── uploads/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docs/
│
├── .env
├── .gitignore
└── README.md
```

---

## ⚙ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/krushi-aiml/hospital-accreditation-ai-platform.git
```

### 2. Navigate to the Project

```bash
cd hospital-accreditation-ai-platform
```

### 3. Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

---

### 4. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root and add:

```env
HF_TOKEN=your_huggingface_api_token
HF_MODEL=your_model_name
```

---

## 🚀 How to Use

1. Sign up or log in.
2. Upload a hospital policy document.
3. Generate AI summary.
4. View compliance score.
5. Perform compliance analysis.
6. View AI recommendations.
7. Ask questions using the AI chatbot.
8. Download the generated accreditation report.

---



# 📸 Project Screenshots

## 🔐 Login Page

![Login](screenshots/Login.png)

---

## 📤 Upload Policy Document

Upload hospital policy documents for AI-based analysis.

![Upload](screenshots/Upload.png)

---

## 📊 Dashboard

Displays compliance statistics, uploaded documents, and overall project status.

![Dashboard](screenshots/Dashboard.png)

---

## 📈 Compliance Score

Shows the hospital's compliance percentage along with readiness indicators.

![Compliance Score](screenshots/Compliance%20score.png)

---

## 🔍 Gap Analysis

AI compares uploaded policies against accreditation standards and identifies missing requirements.

![Analysis](screenshots/Analysis.png)

---

## 🤖 AI Chatbot

Ask questions related to uploaded hospital policies using Meta Llama.

![AI Chatbot](screenshots/AI%20chatbot.png)

---

## 📝 AI Summary

Automatically generates concise summaries of uploaded policy documents.

![Summaries](screenshots/Summaries.png)

---

## 📄 Accreditation Report

Download the AI-generated accreditation readiness report in PDF format.

![Report](screenshots/Report.png)

---

## 📚 Audit History

Track previous analyses and monitor compliance improvements over time.

![Audit History](screenshots/Audit%20history.png)

# 🚀 Future Improvements

- Support multiple accreditation standards (NABH, JCI, ISO)
- AI-powered compliance prediction and risk assessment
- Role-based authentication and access control
- Real-time notifications and email alerts
- Advanced analytics dashboard with trends
- Cloud deployment using Docker and AWS/Azure
- OCR support for scanned hospital documents
- Multi-language support for policy documents

---

# 👨‍💻 Author

**Krushi Jadav**

Computer Engineering Student

Project: **Hospital Accreditation AI Platform**

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!