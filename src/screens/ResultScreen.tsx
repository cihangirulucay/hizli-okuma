import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import type { Session } from '../sessions/models';
import { colors, radii, spacing } from '../theme';
import { formatDurationMs } from '../utils/formatDuration';

type ResultScreenProps = {
  session: Session;
  onRetry: () => void;
  onHome: () => void;
};

export function ResultScreen({ session, onRetry, onHome }: ResultScreenProps) {
  const result = session.exerciseResults[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.checkMark} accessible accessibilityLabel="Tamamlandı">
          <Text style={styles.checkMarkText}>✓</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Çalışma tamamlandı</Text>
          <Text style={styles.subtitle}>
            Kısa ve sakin bir okuma çalışması kaydedildi.
          </Text>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Çalışma süresi</Text>
            <Text style={styles.resultValue}>
              {formatDurationMs(result?.durationMs ?? 0)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Kullanılan sunum temposu</Text>
            <Text style={styles.resultValue}>
              {result?.presentationWpm ?? '-'} kelime/dk
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label="Tekrar Çalış"
            accessibilityLabel="Metronomlu okuma çalışmasını tekrar et"
            onPress={onRetry}
            variant="secondary"
          />
          <PrimaryButton
            label="Ana Ekrana Dön"
            accessibilityLabel="Ana ekrana dön"
            onPress={onHome}
          />
        </View>
      </View>
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
    flex: 1,
    gap: spacing.xl,
    justifyContent: 'center',
    maxWidth: 680,
    padding: spacing.xl,
    width: '100%',
  },
  checkMark: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D9F6EC',
    borderRadius: 999,
    height: 112,
    justifyContent: 'center',
    width: 112,
  },
  checkMarkText: {
    color: colors.teal,
    fontSize: 54,
    fontWeight: '800',
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 31,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.lg,
  },
  resultRow: {
    gap: spacing.sm,
  },
  resultLabel: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
  },
  resultValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: spacing.lg,
  },
  actions: {
    gap: spacing.md,
  },
});
