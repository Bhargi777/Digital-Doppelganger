from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict
from backend.core.stylometry_engine import engine as stylometry_engine
from backend.core.conditioning_layer import conditioning_layer
from backend.core.generation_engine import generation_engine

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
    Uses the conditioning layer to transform metrics into instructions.
    """
    try:
        # Step 1: Condition the style metrics into prompt instructions
        instructions = conditioning_layer.get_prompt_instructions(request.style_metrics)
        
        # Step 2: Generate the draft using the generation engine
        result = await generation_engine.generate(
            prompt=request.prompt,
            instructions=instructions,
            context_type=request.context_type
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
