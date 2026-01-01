import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { questions, traitDescriptions } from "@/data/questions";
import { RefreshCw, Download, Share2 } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface ResultsSectionProps {
  answers: Record<number, number>;
  onRestart: () => void;
}

const ResultsSection = ({ answers, onRestart }: ResultsSectionProps) => {
  const scores = useMemo(() => {
    const traitScores: Record<string, { total: number; count: number }> = {
      openness: { total: 0, count: 0 },
      conscientiousness: { total: 0, count: 0 },
      extraversion: { total: 0, count: 0 },
      agreeableness: { total: 0, count: 0 },
      neuroticism: { total: 0, count: 0 },
    };

    questions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        const score = q.reverse ? 6 - answers[q.id] : answers[q.id];
        traitScores[q.trait].total += score;
        traitScores[q.trait].count += 1;
      }
    });

    return Object.entries(traitScores).map(([trait, data]) => ({
      trait,
      ...traitDescriptions[trait],
      score: data.count > 0 ? Math.round((data.total / data.count / 5) * 100) : 0,
    }));
  }, [answers]);

  const chartData = scores.map((s) => ({
    trait: s.name,
    value: s.score,
    fullMark: 100,
  }));

  const dominantTrait = scores.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  return (
    <section className="min-h-screen gradient-hero py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Vos résultats
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez votre profil de personnalité
            </p>
          </div>

          {/* Main result card */}
          <div className="gradient-card rounded-3xl p-8 md:p-12 shadow-card mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-medium">Trait dominant</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary">
                {dominantTrait.name}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                {dominantTrait.description}
              </p>
            </div>

            {/* Radar Chart */}
            <div className="h-80 md:h-96 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="trait"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Individual trait cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {scores.map((trait, i) => (
              <div
                key={trait.trait}
                className="gradient-card rounded-2xl p-6 shadow-soft animate-slide-in-right"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{trait.name}</h3>
                  <span className="text-2xl font-bold text-primary">
                    {trait.score}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 mb-3">
                  <div
                    className="gradient-primary h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${trait.score}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{trait.description}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button variant="default" onClick={onRestart} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refaire le test
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Télécharger
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Partager
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
