import requests

def test_analyze():
    sample_text = "This is a simple test sentence. It checks if the backend is working correctly."
    response = requests.post("http://localhost:8000/stylometry/analyze", json={"text": sample_text})
    print("Analyze Response:", response.json())

def test_generate():
    sample_metrics = {
        "sentence_length_mean": 15.0,
        "formality_score": 7.5,
        "sentiment_polarity": 0.5
    }
    response = requests.post("http://localhost:8000/stylometry/generate", json={
        "prompt": "Write a thank you note.",
        "style_metrics": sample_metrics,
        "context_type": "email"
    })
    print("Generate Response:", response.json())

if __name__ == "__main__":
    try:
        test_analyze()
        test_generate()
    except Exception as e:
        print("Backend Error:", e)
