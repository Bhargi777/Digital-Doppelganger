from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict
from backend.core.stylometry_engine import engine as stylometry_engine

router = APIRouter(prefix="/stylometry", tags=["Stylometry"])

class TextSampleInput(BaseModel):
    text: str
    metadata: Optional[Dict[str, str]] = None

class StylometryMetrics(BaseModel):
    metrics: Dict[str, float | dict]
    confidence_score: float

class GenerationRequest(BaseModel):
    prompt: str
    style_metrics: Dict[str, float | dict]
    context_type: str = "email"

@router.post("/analyze", response_model=StylometryMetrics)
async def analyze_style(input: TextSampleInput):
    """
    Analyzes the provided text sample and extracts stylistic features.

    Args:
        input (TextSampleInput): The text to be analyzed. Must be at least 50 characters long.

    Returns:
        StylometryMetrics: A dictionary containing various computed metrics and a confidence score.
    """
    if len(input.text) < 50:
        raise HTTPException(status_code=400, detail="Text sample too short. Please provide at least 50 characters.")

    try:
        metrics = stylometry_engine.analyze(input.text)
        # Mock confidence score calculation
        confidence = metrics["lexical_diversity"] * 0.8  # Simplified logic
        return StylometryMetrics(metrics=metrics, confidence_score=round(confidence, 2))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate")
async def generate_draft(request: GenerationRequest):
    """
    Generates a draft based on the user prompt and provided style metrics.
    Currently mocked to demonstrate the architecture.
    """
    # Create conditioning prompt based on metrics
    metrics = request.style_metrics
    prompt_modifiers = []

    if metrics.get("formality_score", 0) > 6:
        prompt_modifiers.append("Use formal, structured language.")
    else:
        prompt_modifiers.append("Keep the tone conversational and casual.")

    if metrics.get("sentence_length_mean", 10) > 20:
        prompt_modifiers.append("Prefer longer, more complex sentences.")
    else:
        prompt_modifiers.append("Keep sentences concise and punchy.")

    sentiment = metrics.get("sentiment_polarity", 0)
    if sentiment > 0.3:
        prompt_modifiers.append("Maintain a positive, optimistic tone.")
    elif sentiment < -0.3:
        prompt_modifiers.append("Adopt a critical or serious tone.")

    system_instruction = f"You are a writing assistant imitating a specific style. Guidelines: {' '.join(prompt_modifiers)}"
    
    # Mock LLM call logic
    mock_response = f"[Draft Generated for '{request.context_type}']\n\nBased on your style profile (Formality: {metrics.get('formality_score')}, Avg Sentence Length: {metrics.get('sentence_length_mean')}), here is a draft:\n\nSubject: Regarding your inquiry\n\nDear recipient,\n\n{system_instruction}\n\nSincerely,\n[Your Name]"
    
    return {
        "generated_text": mock_response,
        "style_alignment_score": 0.85, # Mock score
        "ai_assisted": True
    }
