from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import stylometry
import uvicorn

app = FastAPI(
    title="Digital Doppelgänger",
    description="Ethical Behavioral AI Assistant that learns a user’s communication style patterns.",
    version="0.1.0"
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(stylometry.router)

@app.get("/")
def read_root():
    return {"message": "Digital Doppelgänger Backend is Running"}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
