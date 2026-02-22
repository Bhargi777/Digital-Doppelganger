import { GenerationRequest, GenerationResponse, StylometryMetrics } from "@/lib/types";

const BASE_URL = "http://localhost:8000/stylometry";

export async function analyzeText(text: string): Promise<StylometryMetrics> {
    const response = await fetch(`${BASE_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        throw new Error("Failed to analyze text");
    }

    return response.json() as Promise<StylometryMetrics>;
}

export async function generateDraft(
    prompt: string,
    metrics: GenerationRequest["style_metrics"],
    contextType: string = "email"
): Promise<GenerationResponse> {
    const response = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt,
            style_metrics: metrics,
            context_type: contextType
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to generate draft");
    }

    return response.json() as Promise<GenerationResponse>;
}
