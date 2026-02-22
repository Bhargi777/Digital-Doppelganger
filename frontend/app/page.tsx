"use client";

import { useState } from 'react';
import { analyzeText, generateDraft } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles, Zap, Shield, BarChart3, Edit, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { GenerationResponse, StyleMetrics } from '@/lib/types';

// Dynamic import for Recharts to avoid SSR hydration mismatch
const DynamicStyleRadar = dynamic(() => import('@/components/StyleRadar').then(mod => mod.StyleRadar), { ssr: false });
const DynamicTransparencyLayer = dynamic(() => import('@/components/TransparencyLayer').then(mod => mod.TransparencyLayer), { ssr: false });

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [metrics, setMetrics] = useState<StyleMetrics | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);

  const [prompt, setPrompt] = useState('');
  const [contextType, setContextType] = useState('email');
  const [generation, setGeneration] = useState<GenerationResponse | null>(null);
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText) return;
    setLoadingAnalyze(true);
    try {
      const result = await analyzeText(inputText);
      setMetrics(result.metrics);
      setConfidence(result.confidence_score);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try a longer text sample.");
    } finally {
      setLoadingAnalyze(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt || !metrics) return;
    setLoadingGenerate(true);
    try {
      const result = await generateDraft(prompt, metrics, contextType);
      setGeneration(result);
    } catch (error) {
      console.error(error);
      alert("Generation failed.");
    } finally {
      setLoadingGenerate(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-20">

      {/* Hero Section */}
      <section className="text-center space-y-4 pt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-blue-500 pb-2">
          Your Digital Doppelgänger
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Train an ethical AI model on your unique writing style. Generate authentic drafts without losing your voice.
        </p>
      </section>

      {/* Step 1: Input & Analysis */}
      <section>
        <Card className="border-white/5 bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" />
              Step 1: Analyze Your Style
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste a few paragraphs of your writing here (emails, essays, notes)..."
              className="min-h-[200px] bg-background/50 border-white/10 text-lg"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleAnalyze}
                disabled={loadingAnalyze || inputText.length < 50}
                className="w-full md:w-auto text-lg py-6"
              >
                {loadingAnalyze ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Zap className="mr-2 h-5 w-5" />}
                Analyze Writing Style
              </Button>
            </div>
            {inputText.length > 0 && inputText.length < 50 && (
              <p className="text-sm text-yellow-500">Please provide at least 50 characters for meaningful analysis.</p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Step 2: Dashboard (Conditional) */}
      {metrics && (
        <section className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <Card className="border-white/5 bg-card/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Style Fingerprint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DynamicStyleRadar data={metrics} />
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Key Metrics</CardTitle>
              {confidence !== null && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                  <Shield className="h-3 w-3" />
                  Profile Confidence: {(confidence * 100).toFixed(0)}%
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justifies-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="text-muted-foreground">Formality Score</span>
                <span className="font-mono font-bold text-xl">{metrics.formality_score}/10</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="text-muted-foreground">Avg. Sentence Length</span>
                <span className="font-mono font-bold text-xl">{metrics.sentence_length_mean} words</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="text-muted-foreground">Lexical Diversity</span>
                <span className="font-mono font-bold text-xl">{(metrics.lexical_diversity * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="text-muted-foreground">Sentiment Polarity</span>
                <span className="font-mono font-bold text-xl">{metrics.sentiment_polarity > 0 ? "+" : ""}{metrics.sentiment_polarity}</span>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Trait Explanations Section */}
      {metrics && (
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-500 delay-100">
          <DynamicTransparencyLayer metrics={metrics} />
        </section>
      )}

      {/* Step 3: Generation (Conditional) */}
      {metrics && (
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                Step 2: Generate Draft
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Context / Format</label>
                <div className="flex gap-2">
                  {['Email', 'Chat Message', 'Note', 'Essay'].map((type) => (
                    <Button
                      key={type}
                      variant={contextType === type.toLowerCase() ? "default" : "outline"}
                      onClick={() => setContextType(type.toLowerCase())}
                      size="sm"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="What do you want to write about? E.g., 'Reply to John confirming the meeting for Tuesday at 2 PM'"
                className="bg-background/80"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <Button
                onClick={handleGenerate}
                disabled={loadingGenerate || !prompt}
                className="w-full text-lg py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                {loadingGenerate ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                Generate in My Style
              </Button>

              {generation && (
                <div className="mt-8 pt-8 border-t border-white/10 animate-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Generated Draft</h3>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <Shield className="h-4 w-4" />
                      <span>Style Match: {(generation.style_alignment_score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="p-6 bg-background rounded-lg border border-white/10 font-serif text-lg leading-relaxed whitespace-pre-wrap shadow-inner shadow-black/50">
                    {generation.generated_text}
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generation.generated_text)}>
                      Copy to Clipboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
