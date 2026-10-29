import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  AppState,
  Easing,
  Platform,
  StyleSheet,
} from 'react-native';

/** A short fullscreen dropout followed by a longer pause, inspired by the reference clip. */
export function BlackFlash() {
  const progress = useRef(new Animated.Value(0)).current;
  // Wait for the system preference before starting any flashes.
  const [reduceMotion, setReduceMotion] = useState(true);
  const [active, setActive] = useState(AppState.currentState === 'active');

  useEffect(() => {
    let disposed = false;
    let preferenceChanged = false;
    const motion = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (value) => {
        preferenceChanged = true;
        setReduceMotion(value);
      }
    );
    AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (!disposed && !preferenceChanged) setReduceMotion(value);
      })
      .catch(() => {
        // Keep the static crack if the preference cannot be determined.
      });
    const state = AppState.addEventListener('change', (value) =>
      setActive(value === 'active')
    );
    return () => {
      disposed = true;
      motion.remove();
      state.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || !active) return;
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 3600,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
        isInteraction: false,
      })
    );
    animation.start();
    return () => {
      animation.stop();
      progress.setValue(0);
    };
  }, [active, progress, reduceMotion]);

  if (reduceMotion || !active) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.panel,
        {
          opacity: progress.interpolate({
            // Abrupt dim / black / dim pulses, with clear gaps and a long rest.
            inputRange: [
              0, 0.1, 0.101, 0.12, 0.121, 0.18, 0.181, 0.205, 0.206, 0.3, 0.301,
              0.315, 0.316, 1,
            ],
            outputRange: [0, 0, 0.55, 0.55, 0, 0, 1, 1, 0, 0, 0.35, 0.35, 0, 0],
          }),
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
  },
});
