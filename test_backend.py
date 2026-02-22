from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_analyze() -> None:
    sample_text = "This is a simple test sentence. It checks if the backend is working correctly."

    response = client.post("/stylometry/analyze", json={"text": sample_text})

    assert response.status_code == 200
    payload = response.json()
    assert "metrics" in payload
    assert "confidence_score" in payload


def test_generate() -> None:
    sample_metrics = {
        "sentence_length_mean": 15.0,
        "sentence_variance": 2.0,
        "lexical_diversity": 0.6,
        "punctuation_density": 0.1,
        "formality_score": 7.5,
        "sentiment_polarity": 0.5,
        "sentiment_subjectivity": 0.4,
        "punctuation_usage": {".": 2, ",": 1},
    }

    response = client.post(
        "/stylometry/generate",
        json={
            "prompt": "Write a thank you note.",
            "style_metrics": sample_metrics,
            "context_type": "email",
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert "generated_text" in payload
    assert "style_alignment_score" in payload
