import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { AnalysisPage } from './components/AnalysisPage';
import { LandingPage } from './components/LandingPage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { SurveillanceOverlay } from './components/SurveillanceOverlay';
import { calculateScore } from './lib/scoring';
import type { Answer, AppPhase, EvaluationResult } from './types';

function App() {
  const [phase, setPhase] = useState<AppPhase>('landing');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const handleQuizComplete = useCallback((a: Answer[]) => {
    setAnswers(a);
    setPhase('analysis');
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setResult(calculateScore(answers));
    setPhase('results');
  }, [answers]);

  const handleRetry = useCallback(() => {
    setAnswers([]);
    setResult(null);
    setPhase('landing');
  }, []);

  return (
    <div className="scanlines crt-flicker relative min-h-screen bg-void">
      <SurveillanceOverlay />
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <LandingPage key="landing" onStart={() => setPhase('quiz')} />
        )}
        {phase === 'quiz' && (
          <QuizPage key="quiz" onComplete={handleQuizComplete} />
        )}
        {phase === 'analysis' && (
          <AnalysisPage key="analysis" onComplete={handleAnalysisComplete} />
        )}
        {phase === 'results' && result && (
          <ResultsPage key="results" result={result} onRetry={handleRetry} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
