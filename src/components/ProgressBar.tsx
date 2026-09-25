import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';

type ProgressBarProps = {
  progress: number;
  accessibilityLabel: string;
};

export function ProgressBar({
  progress,
  accessibilityLabel,
}: ProgressBarProps) {
  const normalizedProgress = Math.min(1, Math.max(0, progress));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(normalizedProgress * 100),
      }}
      style={styles.track}
    >
      <View
        style={[styles.indicator, { width: `${normalizedProgress * 100}%` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  indicator: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: '100%',
  },
});
