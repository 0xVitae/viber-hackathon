import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { AnalysisPage } from './components/AnalysisPage';
import { Cityscape } from './components/effects/Cityscape';
import { SurveillanceOverlay } from './components/effects/SurveillanceOverlay';
import { LandingPage } from './components/LandingPage';
import { ResultsPage } from './components/ResultsPage';
import { UploadPage } from './components/UploadPage';
import { generateDripReport } from './lib/analysis';
import type { AppPhase, DripReport } from './types';

function App() {
  const [phase, setPhase] = useState<AppPhase>('landing');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [report, setReport] = useState<DripReport | null>(null);
  const [roastMode, setRoastMode] = useState(false);

  const handleImage = useCallback((url: string) => {
    setImageUrl(url || null);
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setReport(generateDripReport(roastMode));
    setPhase('results');
  }, [roastMode]);

  const handleRetry = useCallback(() => {
    setImageUrl(null);
    setReport(null);
    setPhase('landing');
  }, []);

  return (
    <div className="scanlines crt-flicker relative min-h-screen bg-dragon-void">
      <Cityscape />
      <SurveillanceOverlay />
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <LandingPage key="landing" onStart={() => setPhase('upload')} />
        )}
        {phase === 'upload' && (
          <UploadPage
            key="upload"
            imageUrl={imageUrl}
            onImage={handleImage}
            onBack={() => setPhase('landing')}
            onAnalyse={() => imageUrl && setPhase('analysis')}
            roastMode={roastMode}
            onRoastModeChange={setRoastMode}
          />
        )}
        {phase === 'analysis' && imageUrl && (
          <AnalysisPage
            key="analysis"
            imageUrl={imageUrl}
            onComplete={handleAnalysisComplete}
          />
        )}
        {phase === 'results' && report && imageUrl && (
          <ResultsPage
            key="results"
            report={report}
            imageUrl={imageUrl}
            roastMode={roastMode}
            onRetry={handleRetry}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
