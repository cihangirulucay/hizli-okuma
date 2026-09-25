import { useState } from 'react';

import { MetronomeReadingScreen } from '../exercises/metronome/MetronomeReadingScreen';
import type { AppRoute } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { ResultScreen } from '../screens/ResultScreen';
import type { Session } from '../sessions/models';

export function AppNavigator() {
  const [route, setRoute] = useState<AppRoute>({ name: 'Home' });

  function goHome() {
    setRoute({ name: 'Home' });
  }

  function openMetronomeReading() {
    setRoute({ name: 'MetronomeReading' });
  }

  function openResult(session: Session) {
    setRoute({ name: 'Result', session });
  }

  if (route.name === 'MetronomeReading') {
    return (
      <MetronomeReadingScreen onBack={goHome} onCompleted={openResult} />
    );
  }

  if (route.name === 'Result') {
    return (
      <ResultScreen
        session={route.session}
        onHome={goHome}
        onRetry={openMetronomeReading}
      />
    );
  }

  return <HomeScreen onStartMetronome={openMetronomeReading} />;
}
