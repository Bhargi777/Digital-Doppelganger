from typing import Dict, List

class StyleConditioningLayer:
    def __init__(self):
        pass

    def get_prompt_instructions(self, metrics: Dict[str, float | dict]) -> List[str]:
        """
        Transforms Stylometry metrics into human-readable prompt instructions for an LLM.
        """
        instructions = []

        # Formality
        formality = metrics.get("formality_score", 5)
        if formality > 7:
            instructions.append("Maintain a high level of formality. Use professional and structured language.")
        elif formality < 3:
            instructions.append("Keep the tone very casual, similar to a text message or a relaxed conversation.")
        else:
            instructions.append("Use a standard, semi-formal tone suitable for general correspondence.")

        # Sentence Complexity
        avg_len = metrics.get("sentence_length_mean", 15)
        if avg_len > 22:
            instructions.append("Use complex, multi-clausal sentences with sophisticated transitions.")
        elif avg_len < 10:
            instructions.append("Write in brief, punchy sentences. Avoid unnecessary filler words.")
        
        # Punctuation / Expressiveness
        punc_usage = metrics.get("punctuation_usage", {})
        exclamation_count = punc_usage.get("!", 0)
        if exclamation_count > 0:
            instructions.append("Be expressive and use punctuation to convey enthusiasm when appropriate.")
        
        # Sentiment Polarity
        polarity = metrics.get("sentiment_polarity", 0)
        if polarity > 0.4:
            instructions.append("Adopt a highly positive and encouraging outlook.")
        elif polarity < -0.4:
            instructions.append("Be direct, critical, and objective in your assessment.")

        return instructions

conditioning_layer = StyleConditioningLayer()
