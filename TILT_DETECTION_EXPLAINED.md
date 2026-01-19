# Tilt Detection System - Complete Explanation

## Overview

The game uses the **Device Orientation API** to detect when you tilt your phone forward (CORRECT) or backward (PASS) while it's on your forehead in landscape mode.

**⚠️ CRITICAL: This implementation uses a hybrid Gamma/Beta approach to handle Gimbal Lock.**

---

## The Gimbal Lock Problem

When the phone is perfectly vertical in landscape mode on your forehead, we encounter a mathematical problem called **Gimbal Lock**:

- **Gamma (γ)** is clamped at **-90°** and cannot go lower
- When you tilt your head down past vertical, the browser **flips Beta (β) upside down** instead of changing Gamma
- This means we **cannot rely on Beta alone** for both directions

### The Physics

**Neutral Position (Forehead):**
- γ ≈ **-90°** (clamped at minimum)
- β ≈ **0°** (vertical)

**Look Up (PASS):**
- γ moves from **-90° towards 0°** (screen faces ceiling)
- β stays near 0°

**Look Down (CORRECT):**
- γ stays at **-90°** (cannot go lower)
- β **flips to ~180°** (screen faces floor)

---

## Device Orientation API Basics

### The Three Angles

The API provides three rotation angles:
- **Alpha (α)**: Rotation around Z-axis (compass direction) - 0° to 360°
- **Beta (β)**: Front-to-back tilt - **-180° to 180°** ← **WE USE FOR CORRECT**
- **Gamma (γ)**: Left-to-right tilt - **-90° to 90°** ← **WE USE FOR PASS**

### Beta Angle Explained

**Beta (β)** measures the **front-to-back tilt** of your device:

```
Beta = 0°     → Phone is vertical
Beta = 90°    → Phone is horizontal, screen facing up
Beta = -90°   → Phone is horizontal, screen facing down
Beta = 180°   → Phone is upside down (flipped past vertical)
```

**Range:** -180° to +180° (continuous)

### Gamma Angle Explained

**Gamma (γ)** measures the **left-to-right tilt** of your device:

```
Gamma = -90°  → Phone is vertical (clamped minimum)
Gamma = 0°    → Phone is horizontal
Gamma = 90°   → Phone is vertical (clamped maximum)
```

**Range:** -90° to +90° (clamped)

---

## Hybrid Implementation

### 1. Calibration Phase

```javascript
// On first reading, store the "neutral" position
if (neutralBeta.current === null && beta !== null) {
  neutralBeta.current = beta      // e.g., 0°
  neutralGamma.current = gamma    // e.g., -90°
  setCalibrated(true)
  return  // Don't detect tilts yet
}
```

**What happens:**
- When game starts, first beta and gamma readings become the "zero point"
- This accounts for different head angles and phone positions
- Example: If your head is at β=0°, γ=-90°, that becomes the baseline

### 2. Tilt Detection Phase (Hybrid Approach)

```javascript
// 1. PASS: You look up at the ceiling
// Gamma moves from -90 towards 0.
// Threshold: If gamma is flatter than -50 degrees
if (gamma > -50 && gamma < 0) {
  onPass()  // Trigger PASS
}

// 2. CORRECT: You look down at the floor
// Gamma gets stuck at -90, but Beta flips to +/- 180 when screen faces down.
// Threshold: If Beta is upside down (greater than 140 or less than -140)
if (Math.abs(beta) > 140) {
  onCorrect()  // Trigger CORRECT
}
```

**Current Thresholds:**
- **PASS**: Gamma > **-50°** (gamma moves from -90° towards 0°)
- **CORRECT**: |Beta| > **140°** (beta flips to ~180° when looking down)

### 3. Cooldown System

```javascript
const cooldownMs = 1000  // 1 second between tilts
if (now - lastTiltTime.current < cooldownMs) return
```

**Purpose:** Prevents rapid-fire triggers from sensor noise or shaky hands.

---

## Testing with Chrome DevTools

You can simulate tilt detection in Chrome DevTools:

1. Open Chrome DevTools (F12)
2. Go to **More Tools** → **Sensors**
3. Select **Custom orientation** (NOT "Landscape Left" preset)
4. Enter these values to test:

### Scenario A: Neutral (Start)
```
α: 90
β: 0
γ: -90
```
**Result:** Phone is vertical on forehead. Status: Neutral

### Scenario B: PASS (Look Up)
```
α: 90
β: 0
γ: -45  ← Change this value!
```
**Result:** Phone is tilted back. Status: **PASS** (γ > -50)

### Scenario C: CORRECT (Look Down)
```
α: 90
β: 170  ← Change this value!
γ: -90
```
**Result:** Phone is facing the floor. Status: **CORRECT** (|β| > 140)

---

## Code Location

The tilt detection logic is in:
- **Hook:** `src/hooks/useTiltDetection.js`
- **Debug Component:** `src/components/TiltDebug.jsx`
- **Usage:** `src/components/GameEngine.jsx`

---

## Debug Mode

To see real-time tilt values:

1. Add `?debug=true` to your URL (e.g., `https://headbands.filipmateja.cz/game?debug=true`)
2. The debug panel shows:
   - Current Beta (β) value
   - Current Gamma (γ) value
   - Neutral Beta and Gamma
   - Current status (CORRECT/PASS/Neutral)
   - Visual indicators when thresholds are met

---

## Potential Issues & Adjustments

### 1. Thresholds Too Strict/Loose
- **Problem:** Actions don't trigger or trigger too easily
- **Solution:** Adjust thresholds in `useTiltDetection.js`:
  - PASS: Change `-50` to `-40` (more sensitive) or `-60` (less sensitive)
  - CORRECT: Change `140` to `130` (more sensitive) or `150` (less sensitive)

### 2. Calibration Issues
- **Problem:** Neutral position captured while moving
- **Solution:** Add a delay or averaging window before calibration

### 3. Sensor Noise
- **Problem:** False triggers from shaky hands
- **Solution:** 
  - Increase cooldown time
  - Add smoothing/averaging to readings
  - Require threshold to be held for a duration

### 4. Device Differences
- **Problem:** Different devices behave differently
- **Solution:** Test on multiple devices and adjust thresholds per device type

---

## Technical Details

### Event Listener

```javascript
window.addEventListener('deviceorientation', handleOrientation)
```

**Frequency:** ~60Hz (device dependent)

### Permission (iOS 13+)

```javascript
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
  const response = await DeviceOrientationEvent.requestPermission()
  if (response === 'granted') {
    // Can now listen to orientation events
  }
}
```

**Note:** Must be called from a user gesture (button click).

---

## Summary

The tilt detection uses a **hybrid Gamma/Beta approach** to handle gimbal lock:

- **PASS (Look Up):** Detected via **Gamma** moving from -90° towards 0°
- **CORRECT (Look Down):** Detected via **Beta** flipping to ~180°

This approach correctly handles the mathematical limitation where Gamma cannot go below -90° when the phone is vertical on your forehead.
