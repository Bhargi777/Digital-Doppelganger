# Digital Doppelgänger

An ethical behavioral AI assistant that learns a user’s communication style patterns and generates style-aligned drafts.

## Project Structure
- `backend/`: FastAPI Python application for stylometry analysis and generation.
- `frontend/`: Next.js React application for the user interface.

## Setup Instructions

### Backend
1. Navigate to `backend/`.
2. Create virtual environment: `python -m venv venv`.
3. Activate: `source venv/bin/activate`.
4. Install dependencies: `pip install -r requirements.txt`.
5. Download corpora: `python -m textblob.download_corpora`
6. Run: `uvicorn main:app --reload`

### Frontend
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Run: `npm run dev`.
4. Open `http://localhost:3000`.

## Features
- **Stylometry Engine**: Analyzes sentence length, lexical diversity, formality, and sentiment.
- **Style Dashboard**: Visualizes your writing style fingerprint.
- **Generation Engine**: Creates drafts that match your specific style profile.
