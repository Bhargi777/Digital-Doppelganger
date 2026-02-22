import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StyleMetrics } from "@/lib/types";

interface TraitExplanation {
    trait: string;
    explanation: string;
    value: string | number;
}

export function TransparencyLayer({ metrics }: { metrics: StyleMetrics }) {
    const getTraits = (metrics: StyleMetrics): TraitExplanation[] => {
        const traits: TraitExplanation[] = [];

        if (metrics.formality_score > 7) {
            traits.push({ trait: "Corporate/Formal", explanation: "Your writing uses sophisticated vocabulary and a structured tone common in professional settings.", value: `${metrics.formality_score}/10` });
        } else if (metrics.formality_score < 4) {
            traits.push({ trait: "Conversational", explanation: "Your style is relaxed and approachable, focusing on clarity and direct communication.", value: `${metrics.formality_score}/10` });
        }

        if (metrics.lexical_diversity > 0.6) {
            traits.push({ trait: "Lexically Rich", explanation: "You use a wide variety of unique words, suggesting a deep vocabulary and precise expression.", value: `${(metrics.lexical_diversity * 100).toFixed(1)}%` });
        }

        if (metrics.sentence_length_mean > 20) {
            traits.push({ trait: "Architectural Sentences", explanation: "You prefer building complex, descriptive sentences that provide deep context.", value: `${metrics.sentence_length_mean} words` });
        } else if (metrics.sentence_length_mean < 12) {
            traits.push({ trait: "Concise Communicator", explanation: "You favor brevity and impact, making your points quickly and clearly.", value: `${metrics.sentence_length_mean} words` });
        }

        return traits;
    };

    const traits = getTraits(metrics);

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-400" />
                Trait Explanations
            </h3>
            <div className="grid gap-4">
                {traits.map((t, i) => (
                    <Card key={i} className="bg-white/5 border-white/10">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-primary">{t.trait}</span>
                                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded ring-1 ring-primary/30">{t.value}</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t.explanation}
                            </p>
                        </CardContent>
                    </Card>
                ))}
                {traits.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Insufficient data to extract distinct behavioral traits yet.</p>
                )}
            </div>
        </div>
    );
}
