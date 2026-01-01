import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface QuizSectionProps {
  onComplete: (answers: Record<number, number>) => void;
  onBack: () => void;
}

const answerOptions = [
  { value: 1, label: "Pas du tout d'accord" },
  { value: 2, label: "Pas d'accord" },
  { value: 3, label: "Neutre" },
  { value: 4, label: "D'accord" },
  { value: 5, label: "Tout à fait d'accord" },
];

const QuizSection = ({ onComplete, onBack }: QuizSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswer = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  return (
    <section className="min-h-screen gradient-hero flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentIndex + 1} sur {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question card */}
          <div 
            key={currentQuestion.id}
            className="gradient-card rounded-3xl p-8 md:p-12 shadow-card animate-scale-in"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center leading-relaxed">
              {currentQuestion.text}
            </h2>

            {/* Answer options */}
            <div className="space-y-3">
              {answerOptions.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between group ${
                      isSelected
                        ? "gradient-primary text-primary-foreground shadow-glow"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 animate-scale-in" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentIndex === 0 ? "Retour" : "Précédent"}
              </Button>

              <Button
                variant="default"
                onClick={handleNext}
                disabled={!hasAnswer}
                className="gap-2"
              >
                {isLastQuestion ? "Voir les résultats" : "Suivant"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
