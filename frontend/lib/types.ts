export interface StyleMetrics {
    sentence_length_mean: number;
    sentence_variance: number;
    lexical_diversity: number;
    punctuation_density: number;
    formality_score: number;
    sentiment_polarity: number;
    sentiment_subjectivity: number;
    punctuation_usage: Record<string, number>;
}

export interface StylometryMetrics {
    metrics: StyleMetrics;
    confidence_score: number;
}

export interface GenerationRequest {
    prompt: string;
    style_metrics: StyleMetrics;
    context_type: string;
}

export interface GenerationResponse {
    generated_text: string;
    style_alignment_score: number;
    ai_assisted: boolean;
}
