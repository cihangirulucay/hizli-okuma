import { useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';
import { grade2ReadingTexts } from '../../content/grade2/readingTexts';
import { completeMetronomeSession } from '../../sessions/sessionService';
import type { Session } from '../../sessions/models';
import { colors, radii, spacing } from '../../theme';
import { formatDurationMs } from '../../utils/formatDuration';
import {
  getActiveWordIndex,
  getPresentationProgress,
  getTotalPresentationDurationMs,
  isMetronomeComplete,
  normalizePresentationWpm,
  tokenizeWords,
} from './engine';
import {
  DEFAULT_PRESENTATION_WPM,
  MAX_PRESENTATION_WPM,
  MIN_PRESENTATION_WPM,
  PRESENTATION_WPM_STEP,
  type MetronomePlaybackState,
} from './models';

type MetronomeReadingScreenProps = {
  onBack: () => void;
  onCompleted: (session: Session) => void;
};

export function MetronomeReadingScreen({
  onBack,
  onCompleted,
}: MetronomeReadingScreenProps) {
  const readingText = grade2ReadingTexts[0];
  const words = useMemo(() => tokenizeWords(readingText.text), [readingText]);
  const [presentationWpm, setPresentationWpm] = useState(
    DEFAULT_PRESENTATION_WPM,
  );
  const [playbackState, setPlaybackState] =
    useState<MetronomePlaybackState>('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const elapsedBeforeRunMs = useRef(0);
  const runStartedAtMs = useRef<number | null>(null);

  const totalDurationMs = getTotalPresentationDurationMs(
    words.length,
    presentationWpm,
  );
  const activeWordIndex = getActiveWordIndex({
    elapsedMs,
    presentationWpm,
    wordCount: words.length,
  });
  const progress = getPresentationProgress({
    elapsedMs,
    presentationWpm,
    wordCount: words.length,
  });
  const canChangeTempo = playbackState !== 'running';
  const canComplete = playbackState === 'completed';

  useEffect(() => {
    if (playbackState !== 'running') {
      return undefined;
    }

    const intervalId = setInterval(() => {
      if (runStartedAtMs.current === null) {
        return;
      }

      const nextElapsedMs =
        elapsedBeforeRunMs.current + Date.now() - runStartedAtMs.current;

      if (
        isMetronomeComplete({
          elapsedMs: nextElapsedMs,
          presentationWpm,
          wordCount: words.length,
        })
      ) {
        setElapsedMs(totalDurationMs);
        elapsedBeforeRunMs.current = totalDurationMs;
        runStartedAtMs.current = null;
        setPlaybackState('completed');
        return;
      }

      setElapsedMs(nextElapsedMs);
    }, 100);

    return () => clearInterval(intervalId);
  }, [playbackState, presentationWpm, totalDurationMs, words.length]);

  function start() {
    const now = new Date();
    setStartedAt(now.toISOString());
    setSaveError(null);
    setElapsedMs(0);
    elapsedBeforeRunMs.current = 0;
    runStartedAtMs.current = Date.now();
    setPlaybackState('running');
  }

  function pause() {
    elapsedBeforeRunMs.current = elapsedMs;
    runStartedAtMs.current = null;
    setPlaybackState('paused');
  }

  function resume() {
    runStartedAtMs.current = Date.now();
    setPlaybackState('running');
  }

  function restart() {
    setStartedAt(null);
    setElapsedMs(0);
    setSaveError(null);
    elapsedBeforeRunMs.current = 0;
    runStartedAtMs.current = null;
    setPlaybackState('idle');
  }

  function adjustTempo(delta: number) {
    if (!canChangeTempo) {
      return;
    }

    setPresentationWpm((currentValue) =>
      normalizePresentationWpm(currentValue + delta),
    );
  }

  async function completeSession() {
    if (!startedAt || !canComplete || isSaving) {
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const completedAt = new Date().toISOString();
      const session = await completeMetronomeSession({
        contentId: readingText.id,
        startedAt,
        completedAt,
        completed: true,
        difficulty: readingText.difficulty,
        wordCount: readingText.wordCount,
        presentationWpm,
      });
      onCompleted(session);
    } catch {
      setSaveError('Çalışma kaydedilemedi. Lütfen tekrar dene.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <PrimaryButton
            label="Geri"
            accessibilityLabel="Ana ekrana geri dön"
            onPress={onBack}
            variant="secondary"
            style={styles.backButton}
          />
          <Text style={styles.screenTitle}>Metronomlu Okuma</Text>
        </View>

        <View style={styles.progressBlock}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>Çalışma ilerlemesi</Text>
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
          <ProgressBar
            progress={progress}
            accessibilityLabel={`Çalışma ilerlemesi yüzde ${Math.round(
              progress * 100,
            )}`}
          />
        </View>

        <View style={styles.readingCard}>
          <Text style={styles.kicker}>Sunum temposu egzersizi</Text>
          <Text style={styles.readingTitle}>{readingText.title}</Text>
          <Text
            accessibilityLabel={`Okunacak metin: ${readingText.text}`}
            style={styles.readingText}
          >
            {words.map((word, index) => (
              <Text
                key={`${word}-${index}`}
                style={[
                  styles.word,
                  index === activeWordIndex &&
                    playbackState !== 'idle' &&
                    styles.activeWord,
                ]}
              >
                {word}
                {index < words.length - 1 ? ' ' : ''}
              </Text>
            ))}
          </Text>
        </View>

        <View style={styles.tempoCard}>
          <View>
            <Text style={styles.tempoLabel}>Sunum temposu</Text>
            <Text style={styles.tempoValue}>{presentationWpm} kelime/dk</Text>
          </View>
          <View style={styles.tempoControls}>
            <PrimaryButton
              label="-"
              accessibilityLabel="Sunum temposunu azalt"
              onPress={() => adjustTempo(-PRESENTATION_WPM_STEP)}
              disabled={
                !canChangeTempo || presentationWpm <= MIN_PRESENTATION_WPM
              }
              variant="quiet"
              style={styles.tempoButton}
            />
            <PrimaryButton
              label="+"
              accessibilityLabel="Sunum temposunu artır"
              onPress={() => adjustTempo(PRESENTATION_WPM_STEP)}
              disabled={
                !canChangeTempo || presentationWpm >= MAX_PRESENTATION_WPM
              }
              variant="quiet"
              style={styles.tempoButton}
            />
          </View>
        </View>

        <View style={styles.statusBlock}>
          <Text style={styles.statusText}>
            {playbackState === 'completed'
              ? 'Sunum tamamlandı. Sonucu kaydedebilirsin.'
              : `Tahmini sunum süresi: ${formatDurationMs(totalDurationMs)}`}
          </Text>
        </View>

        <View style={styles.controls}>
          {playbackState === 'idle' && (
            <PrimaryButton
              label="Başlat"
              accessibilityLabel="Metronomlu okumayı başlat"
              onPress={start}
            />
          )}
          {playbackState === 'running' && (
            <PrimaryButton
              label="Duraklat"
              accessibilityLabel="Metronomlu okumayı duraklat"
              onPress={pause}
              variant="quiet"
            />
          )}
          {playbackState === 'paused' && (
            <PrimaryButton
              label="Devam"
              accessibilityLabel="Metronomlu okumaya devam et"
              onPress={resume}
            />
          )}
          <PrimaryButton
            label="Yeniden Başlat"
            accessibilityLabel="Metronomlu okumayı yeniden başlat"
            onPress={restart}
            variant="secondary"
            disabled={playbackState === 'idle'}
          />
          <PrimaryButton
            label={isSaving ? 'Kaydediliyor' : 'Çalışmayı Tamamla'}
            accessibilityLabel="Çalışmayı tamamla ve sonucu kaydet"
            onPress={completeSession}
            disabled={!canComplete || isSaving}
          />
        </View>

        {saveError ? <Text style={styles.errorText}>{saveError}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    alignSelf: 'center',
    gap: spacing.lg,
    maxWidth: 760,
    padding: spacing.lg,
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  backButton: {
    minHeight: 48,
    minWidth: 76,
  },
  screenTitle: {
    color: colors.text,
    flex: 1,
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
  },
  progressBlock: {
    gap: spacing.sm,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
  },
  readingCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  kicker: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  readingTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  readingText: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 38,
  },
  word: {
    color: colors.text,
  },
  activeWord: {
    backgroundColor: colors.primarySoft,
    color: colors.primaryDark,
    fontWeight: '800',
  },
  tempoCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  tempoLabel: {
    color: colors.textMuted,
    fontSize: 15,
  },
  tempoValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  tempoControls: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tempoButton: {
    minHeight: 52,
    minWidth: 56,
    paddingHorizontal: spacing.md,
  },
  statusBlock: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.sm,
    padding: spacing.md,
  },
  statusText: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  controls: {
    gap: spacing.md,
  },
  errorText: {
    color: colors.coral,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
