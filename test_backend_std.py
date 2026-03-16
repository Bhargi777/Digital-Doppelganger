import json
import urllib.request

def test_analyze():
    sample_text = "This is a simple test sentence. It checks if the backend is working correctly. More characters to reach 50."
    data = json.dumps({"text": sample_text}).encode('utf-8')
    req = urllib.request.Request("http://localhost:8000/stylometry/analyze", data=data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as f:
        print("Analyze Response:", f.read().decode('utf-8'))

def test_generate():
    sample_metrics = {
        "sentence_length_mean": 15.0,
        "formality_score": 7.5,
        "lexical_diversity": 0.5,
        "punctuation_usage": {"!": 1}
    }
    data = json.dumps({
        "prompt": "Write a thank you note.",
        "style_metrics": sample_metrics,
        "context_type": "email"
    }).encode('utf-8')
    req = urllib.request.Request("http://localhost:8000/stylometry/generate", data=data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as f:
        print("Generate Response:", f.read().decode('utf-8'))

if __name__ == "__main__":
    try:
        test_analyze()
        test_generate()
    except Exception as e:
        print("Backend Error:", e)
