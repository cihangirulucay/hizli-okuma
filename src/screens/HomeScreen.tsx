import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { grade2ReadingTexts } from '../content/grade2/readingTexts';
import { getCompletedSessions } from '../sessions/sessionService';
import { colors, radii, spacing } from '../theme';

type HomeScreenProps = {
  onStartMetronome: () => void;
};

export function HomeScreen({ onStartMetronome }: HomeScreenProps) {
  const [savedSessionCount, setSavedSessionCount] = useState(0);
  const recommendedText = grade2ReadingTexts[0];

  useEffect(() => {
    let mounted = true;

    getCompletedSessions()
      .then((sessions) => {
        if (mounted) {
          setSavedSessionCount(sessions.length);
        }
      })
      .catch(() => {
        if (mounted) {
          setSavedSessionCount(0);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>2. sınıf demo çalışması</Text>
          <Text style={styles.title}>Merhaba, Okur!</Text>
          <Text style={styles.subtitle}>
            Bugün sakin bir okuma ritmi çalışması yapalım.
          </Text>
        </View>

        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>Kaydedilen çalışma</Text>
            <Text style={styles.summaryValue}>{savedSessionCount}</Text>
          </View>
          <View style={styles.badge} accessible accessibilityLabel="ABC rozeti">
            <Text style={styles.badgeText}>ABC</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardKicker}>Bugünün adımı</Text>
          <Text style={styles.cardTitle}>Metronomlu Okuma</Text>
          <Text style={styles.cardBody}>
            Sunum temposunu takip ederek kısa bir metni okuyacaksın.
          </Text>
          <View style={styles.textMeta}>
            <Text style={styles.metaText}>{recommendedText.title}</Text>
            <Text style={styles.metaText}>
              {recommendedText.wordCount} kelime
            </Text>
          </View>
          <ProgressBar
            progress={0.25}
            accessibilityLabel="Günlük çalışma ilerlemesi yüzde 25"
          />
          <PrimaryButton
            label="Çalışmaya Başla"
            accessibilityLabel="Metronomlu okuma çalışmasına başla"
            onPress={onStartMetronome}
            style={styles.startButton}
          />
        </View>
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
    maxWidth: 720,
    padding: spacing.xl,
    width: '100%',
  },
  header: {
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 18,
    lineHeight: 26,
  },
  summary: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 15,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  badgeText: {
    color: colors.surface,
    fontSize: 21,
    fontWeight: '800',
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  cardKicker: {
    color: colors.coral,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
  },
  cardBody: {
    color: colors.textMuted,
    fontSize: 17,
    lineHeight: 25,
  },
  textMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaText: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 8,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  startButton: {
    marginTop: spacing.sm,
  },
});
