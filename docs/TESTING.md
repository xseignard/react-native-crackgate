# Verification

Tested on 2026-10-29 using Expo Go on **iPhone 17 Pro Max / iOS 26.5**,
UDID `010D2F23-3C9C-4605-8987-39A50C79C48D`.

## Simulator checks

- The overlay reaches the full app viewport, with no phone mockup or inset screen.
- Rotating to landscape resizes the fullscreen overlay to the new viewport.
- Tapping the button under the overlay increments its counter (5 → 6).
- Switching “Crack the screen” off removes all damage and shows “DISPLAY RESTORED”.
- Switching it on restores the damage.
- “Ouch” increases the visible line and junction thickness and becomes selected.
- “← Left” reverses the horizontal streaks and becomes selected.
- “Move the fracture” moves the junction from (48%, 60%) to (32%, 42%).
- The decorative overlay is absent from the accessibility tree; underlying buttons
  and the switch remain discoverable.

Screenshots in `screenshots/` are actual simulator captures from this session.
The blue gear belongs to Expo Go, not the example app.

## Build checks

```sh
corepack yarn typecheck
corepack yarn lint
corepack yarn prepare
corepack yarn example build:web
corepack yarn pack --out /tmp/react-native-crackgate.tgz
```

TypeScript, lint, Bob's ES module/declaration build, web export, and package archive
creation passed. The archive contains the compiled entry point and declarations.
Android has not been tested on a device.

## Local run

```sh
corepack yarn example start --port 8084 --localhost
```

Open `exp://localhost:8084` in Expo Go on the simulator. On this machine,
`--localhost` binds to IPv6 loopback; use `localhost` rather than `127.0.0.1`.
The example uses the library source through the generated Metro configuration,
so JavaScript changes refresh without a native rebuild.

## Black flash verification

The full-width flash was verified on the same simulator. Frame analysis sampled
both the left and right screen edges: both reached black on exactly the same
frames. The colored crack lines remain visible over the blackout. The flash
covers the whole container independently of crack direction and position.
`screenshots/ios-black-flash.gif` is extracted from this updated simulator recording.

Earlier checks also confirmed the tap counter advances with flashes enabled and
disabled, and a 43-second recording with “Black flashes” off contained no blackouts.

TypeScript, ESLint, Bob's module/declaration build, and the web export passed.
Reduce Motion and background cleanup are implemented through React Native's
accessibility and app-state APIs; those OS setting transitions were not exercised
on the simulator in this pass.
