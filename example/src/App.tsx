import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CrackgateView } from 'react-native-crackgate';

export default function App() {
  const [enabled, setEnabled] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [thickness, setThickness] = useState(1);
  const [origin, setOrigin] = useState({ x: 0.48, y: 0.6 });
  const [presses, setPresses] = useState(0);

  return (
    <CrackgateView
      style={styles.root}
      effect={{
        enabled,
        direction,
        thickness,
        origin,
        testID: 'crackgate-overlay',
      }}
    >
      <StatusBar style="dark" />
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.wordmark}>
            crackgate<Text style={styles.dot}>.</Text>
          </Text>
          <Text style={styles.badge}>LIVE DEMO</Text>
        </View>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>A VERY EXPENSIVE LOOK. FOR FREE.</Text>
          <Text style={styles.title}>{'Perfectly\nimperfect.'}</Text>
          <Text style={styles.subtitle}>
            {'Your screen is fine.\nThe pixels are having a moment.'}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setPresses((value) => value + 1)}
            style={styles.primary}
          >
            <Text style={styles.primaryText}>
              {presses
                ? `Still works. Tapped ${presses}×`
                : 'Tap through the crack'}
              <Text> ↗</Text>
            </Text>
          </Pressable>
          <Text style={styles.touchHint}>All pixels. Zero interference.</Text>
        </View>
        <View style={styles.controls}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Crack the screen</Text>
              <Text style={styles.hint}>Your warranty is safe.</Text>
            </View>
            <Switch
              accessibilityLabel="Crack the screen"
              value={enabled}
              onValueChange={setEnabled}
              trackColor={{ false: '#414347', true: '#c6f17c' }}
              thumbColor="#ffffff"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Pixel damage</Text>
            <View style={styles.choices}>
              {([1, 2, 3] as const).map((value) => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: thickness === value }}
                  onPress={() => setThickness(value)}
                  style={[
                    styles.choice,
                    thickness === value && styles.selected,
                  ]}
                >
                  <Text
                    style={[
                      styles.choiceText,
                      thickness === value && styles.selectedText,
                    ]}
                  >
                    {value === 1 ? 'Fine' : value === 2 ? 'Bad' : 'Ouch'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Line direction</Text>
            <View style={styles.choices}>
              {(['left', 'right'] as const).map((value) => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: direction === value }}
                  onPress={() => setDirection(value)}
                  style={[
                    styles.choice,
                    direction === value && styles.selected,
                  ]}
                >
                  <Text
                    style={[
                      styles.choiceText,
                      direction === value && styles.selectedText,
                    ]}
                  >
                    {value === 'left' ? '← Left' : 'Right →'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              setOrigin(
                origin.x === 0.48 ? { x: 0.32, y: 0.42 } : { x: 0.48, y: 0.6 }
              )
            }
            style={styles.relocate}
          >
            <Text style={styles.relocateText}>Move the fracture ↗</Text>
          </Pressable>
        </View>
        <View style={styles.caption}>
          <View style={[styles.indicator, !enabled && styles.indicatorOff]} />
          <Text style={styles.captionText}>
            {enabled ? 'SIMULATED DAMAGE' : 'DISPLAY RESTORED'}
          </Text>
          <Text style={styles.captionAside}>#crackgate</Text>
        </View>
        <Text style={styles.footer}>
          A little broken. Entirely intentional.
        </Text>
      </ScrollView>
    </CrackgateView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f3f1e9' },
  page: { flex: 1 },
  content: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingTop: 72,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  wordmark: {
    color: '#20271e',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
  dot: { color: '#6c8838' },
  badge: {
    fontSize: 9,
    color: '#717a66',
    letterSpacing: 1.5,
    borderColor: '#c7ceba',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  hero: { marginBottom: 32 },
  eyebrow: {
    color: '#667b41',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 18,
  },
  title: {
    color: '#20271e',
    fontSize: 60,
    lineHeight: 61,
    fontWeight: '600',
    letterSpacing: -3,
  },
  subtitle: {
    color: '#72796c',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 26,
  },
  primary: {
    borderRadius: 12,
    backgroundColor: '#20271e',
    alignItems: 'center',
    paddingVertical: 17,
  },
  primaryText: { color: '#f1f4e9', fontSize: 14, fontWeight: '600' },
  touchHint: {
    color: '#7c8474',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 12,
  },
  controls: {
    backgroundColor: '#20271e',
    borderRadius: 18,
    padding: 20,
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  label: { fontSize: 13, color: '#e1e5d9', fontWeight: '500' },
  hint: { fontSize: 11, color: '#99a28f', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#3c4535' },
  choices: { flexDirection: 'row', gap: 4 },
  choice: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 7,
    backgroundColor: '#323c2b',
  },
  selected: { backgroundColor: '#c6f17c' },
  choiceText: { color: '#b5bea9', fontSize: 11, fontWeight: '600' },
  selectedText: { color: '#26301a' },
  relocate: {
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4a573e',
    borderRadius: 8,
  },
  relocateText: { color: '#c6f17c', fontSize: 12 },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 7,
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#667b41',
  },
  indicatorOff: { backgroundColor: '#9fa692' },
  captionText: { fontSize: 8, color: '#68755b', letterSpacing: 1 },
  captionAside: { marginLeft: 'auto', fontSize: 10, color: '#68755b' },
  footer: {
    color: '#7c8474',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 24,
  },
});
