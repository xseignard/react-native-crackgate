import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';
import { BlackFlash } from './BlackFlash';

export type CrackgateProps = {
  /** Whether the damage is visible. @default true */
  enabled?: boolean;
  /** Junction position as fractions of the container (0–1). */
  origin?: { x: number; y: number };
  /** Opacity of the entire effect (0–1). @default 1 */
  intensity?: number;
  /** Scale of the pixel lines and junction (0.25–4). @default 1 */
  thickness?: number;
  /** Edge reached by the horizontal damaged pixels. @default 'right' */
  direction?: 'left' | 'right';
  /** Brief full-width blackouts; respects Reduce Motion. @default false */
  flash?: boolean;
  testID?: string;
};

export type CrackgateViewProps = ViewProps & {
  /** Options passed to the overlay. */
  effect?: CrackgateProps;
};

const DEFAULT_ORIGIN = { x: 0.48, y: 0.6 };
const HORIZONTAL_COLORS = [
  '#62294d',
  '#ff8dd8',
  '#fff0fb',
  '#9feaff',
  '#efffff',
  '#30d995',
  '#d3ff9f',
  '#f9ffe3',
  '#74b77a',
];
const VERTICAL_COLORS = ['#8da965', '#e6ff9b', '#fffde0', '#eeffb1'];

function clamp(value: number, min: number, max: number, fallback: number) {
  return Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

/**
 * A decorative, touch-through cracked-display overlay. Render last inside a
 * positioned container. It covers that container, not native modals or system UI.
 */
export function Crackgate({
  enabled = true,
  origin = DEFAULT_ORIGIN,
  intensity = 1,
  thickness = 1,
  direction = 'right',
  flash = false,
  testID,
}: CrackgateProps) {
  const opacity = clamp(intensity, 0, 1, 1);
  if (!enabled || opacity === 0) return null;

  const x = clamp(origin.x, 0, 1, DEFAULT_ORIGIN.x);
  const y = clamp(origin.y, 0, 1, DEFAULT_ORIGIN.y);
  const scale = clamp(thickness, 0.25, 4, 1);
  const pixel = Math.max(StyleSheet.hairlineWidth, 0.55 * scale);
  const left = `${x * 100}%` as const;
  const top = `${y * 100}%` as const;
  const horizontal =
    direction === 'right'
      ? { left, right: 0 }
      : { left: 0, right: `${(1 - x) * 100}%` as const };

  return (
    <View
      testID={testID}
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.overlay, { opacity }]}
    >
      {flash && <BlackFlash />}
      <View
        style={[
          styles.line,
          styles.seamGlow,
          {
            left,
            height: top,
            width: 3 * scale,
            transform: [{ translateX: -1.5 * scale }],
          },
        ]}
      />
      <View
        style={[
          styles.line,
          styles.seam,
          {
            left,
            height: top,
            width: pixel,
            transform: [{ translateX: -pixel / 2 }],
          },
        ]}
      />
      <View
        style={[
          styles.line,
          horizontal,
          styles.horizontalGlow,
          {
            top,
            height: 14 * scale,
            transform: [{ translateY: -7 * scale }],
          },
        ]}
      />
      {HORIZONTAL_COLORS.map((color, index) => (
        <View
          key={color}
          style={[
            styles.line,
            horizontal,
            {
              top,
              height: pixel,
              backgroundColor: color,
              transform: [{ translateY: (index - 4) * pixel }],
            },
          ]}
        />
      ))}
      <View
        style={[
          styles.line,
          styles.verticalGlow,
          {
            left,
            top,
            width: 7 * scale,
            transform: [{ translateX: -3.5 * scale }],
          },
        ]}
      />
      {VERTICAL_COLORS.map((color, index) => (
        <View
          key={color}
          style={[
            styles.line,
            styles.verticalLine,
            {
              left,
              top,
              width: pixel,
              backgroundColor: color,
              transform: [{ translateX: (index - 1.5) * pixel }],
            },
          ]}
        />
      ))}
      <View
        style={[
          styles.line,
          styles.junction,
          {
            left,
            top,
            width: 4 * scale,
            height: 7 * scale,
            borderRadius: 3 * scale,
            transform: [
              { translateX: -2 * scale },
              { translateY: -3.5 * scale },
              { rotate: '18deg' },
            ],
          },
        ]}
      />
      <View
        style={[
          styles.line,
          styles.highlight,
          {
            left,
            top,
            width: pixel,
            height: 3 * scale,
            transform: [{ translateY: -scale }],
          },
        ]}
      />
    </View>
  );
}

/** Wrap any content in a clipped container with the damage rendered on top. */
export function CrackgateView({
  children,
  style,
  effect,
  ...props
}: CrackgateViewProps) {
  return (
    <View {...props} style={[style, styles.container]}>
      {children}
      <Crackgate {...effect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    zIndex: 9999,
  },
  line: { position: 'absolute' },
  seamGlow: { top: 0, backgroundColor: '#34352e', opacity: 0.18 },
  seam: { top: 0, backgroundColor: '#252922', opacity: 0.85 },
  horizontalGlow: { backgroundColor: '#c8ffd3', opacity: 0.12 },
  verticalGlow: { bottom: 0, backgroundColor: '#edffad', opacity: 0.16 },
  verticalLine: { bottom: 0 },
  junction: { backgroundColor: '#35464c' },
  highlight: { backgroundColor: '#eefff3' },
});
