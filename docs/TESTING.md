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

The updated Expo example was tested on the same simulator. The tap counter
advanced with flashes both enabled and disabled. Frame analysis of a 26-second
iOS recording confirmed right-panel blackouts repeating every 3.6 seconds while
the left panel stayed unchanged. A 43-second recording with “Black flashes” off
contained no blackouts. Selecting “← Left” mirrored the blackout: frame analysis
confirmed that only the left panel flashed. The colored crack lines remain visible during the black
frames. `screenshots/ios-black-flash.gif` is extracted from the simulator recording.

TypeScript, ESLint, Bob's module/declaration build, and the web export passed.
Reduce Motion and background cleanup are implemented through React Native's
accessibility and app-state APIs; those OS setting transitions were not exercised
on the simulator in this pass.
