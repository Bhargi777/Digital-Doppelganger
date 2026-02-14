"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { StylometryMetrics } from '@/lib/types';

export function StyleRadar({ data }: { data: StylometryMetrics['metrics'] }) {
    const chartData = [
        { subject: 'Formality', A: (data.formality_score / 10) * 100, fullMark: 100 },
        { subject: 'Diversity', A: data.lexical_diversity * 100, fullMark: 100 },
        { subject: 'Sentiment', A: ((data.sentiment_polarity + 1) / 2) * 100, fullMark: 100 }, // Normalize -1..1 to 0..100
        { subject: 'Complexity', A: Math.min((data.sentence_length_mean / 30) * 100, 100), fullMark: 100 },
        { subject: 'Punctuation', A: Math.min((data.punctuation_density * 20) * 100, 100), fullMark: 100 }, // Scaling factor heuristic
    ];

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Style Profile"
                        dataKey="A"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fill="#8b5cf6"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
