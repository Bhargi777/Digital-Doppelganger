import re
import math
from collections import Counter
from textblob import TextBlob

class StylometryEngine:
    def __init__(self):
        pass

    def analyze(self, text: str) -> dict:
        """
        Analyzes the text and returns a dictionary of stylometric features.
        """
        if not text:
            return {}

        blob = TextBlob(text)
        sentences = blob.sentences
        words = blob.words

        if not sentences or not words:
            return {}

        # 1. Mean Sentence Length and Variance
        sentence_lengths = [len(s.words) for s in sentences]
        mean_sentence_length = sum(sentence_lengths) / len(sentences) if sentences else 0
        
        variance = 0
        if len(sentences) > 1:
            variance = sum([(x - mean_sentence_length) ** 2 for x in sentence_lengths]) / (len(sentences) - 1)
        sentence_variance = math.sqrt(variance)

        # 2. Lexical Diversity (Type-Token Ratio)
        unique_words = set(words.lower())
        lexical_diversity = len(unique_words) / len(words) if words else 0

        # 3. Punctuation Fingerprint
        punctuations = [char for char in text if char in "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]
        punctuation_density = len(punctuations) / len(text) if text else 0
        punctuation_counts = Counter(punctuations)
        
        # 4. Formality Index (Simplified)
        # Higher avg word length -> more formal usually
        avg_word_length = sum(len(word) for word in words) / len(words) if words else 0
        formality_score = (avg_word_length - 3) * 2  # Heuristic scaling
        formality_score = max(0, min(10, formality_score)) # Clamp 0-10

        # 5. Sentiment & Subjectivity
        sentiment = blob.sentiment
        polarity = sentiment.polarity # -1 to 1
        subjectivity = sentiment.subjectivity # 0 to 1

        return {
            "sentence_length_mean": round(mean_sentence_length, 2),
            "sentence_variance": round(sentence_variance, 2),
            "lexical_diversity": round(lexical_diversity, 2),
            "punctuation_density": round(punctuation_density, 3),
            "formality_score": round(formality_score, 2),
            "sentiment_polarity": round(polarity, 2),
            "sentiment_subjectivity": round(subjectivity, 2),
            "punctuation_usage": dict(punctuation_counts) # Detailed counts
        }

engine = StylometryEngine()
