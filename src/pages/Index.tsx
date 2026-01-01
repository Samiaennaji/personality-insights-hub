import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import QuizSection from "@/components/QuizSection";
import ResultsSection from "@/components/ResultsSection";

type AppState = "home" | "quiz" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("home");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStartQuiz = () => {
    setAppState("quiz");
    setAnswers({});
  };

  const handleQuizComplete = (quizAnswers: Record<number, number>) => {
    setAnswers(quizAnswers);
    setAppState("results");
  };

  const handleRestart = () => {
    setAppState("home");
    setAnswers({});
  };

  const handleBackToHome = () => {
    setAppState("home");
  };

  return (
    <main className="min-h-screen">
      {appState === "home" && <HeroSection onStartQuiz={handleStartQuiz} />}
      {appState === "quiz" && (
        <QuizSection onComplete={handleQuizComplete} onBack={handleBackToHome} />
      )}
      {appState === "results" && (
        <ResultsSection answers={answers} onRestart={handleRestart} />
      )}
    </main>
  );
};

export default Index;
