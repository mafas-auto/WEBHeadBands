# Tilt Detection System - Complete Explanation

## Overview

The game uses the **Device Orientation API** to detect when you tilt your phone forward (CORRECT) or backward (PASS) while it's on your forehead in landscape mode.

---

## Device Orientation API Basics

### The Three Angles

The API provides three rotation angles:
- **Alpha (γ)**: Rotation around Z-axis (compass direction) - 0° to 360°
- **Beta (β)**: Front-to-back tilt - **-180° to 180°** ← **WE USE THIS**
- **Gamma (γ)**: Left-to-right tilt - -90° to 90°

### Beta Angle Explained

**Beta (β)** measures the **front-to-back tilt** of your device:

```
Beta = 0°     → Phone is flat (horizontal)
Beta = 90°    → Phone is vertical, screen facing up
Beta = -90°   → Phone is vertical, screen facing down
Beta = 180°   → Phone is upside down
```

**Range:** -180° to +180° (continuous)

---

## How It Works in Landscape Mode on Forehead

### Physical Setup
- Phone is in **landscape mode** (horizontal)
- Placed on **forehead** (screen facing away from you)
- You tilt your **head** (not the phone)

### Beta Behavior in This Position

When phone is on forehead in landscape:

```
Initial Position (calibrated):
  Beta ≈ 0° to 30° (depending on head angle)

Forward Tilt (chin down):
  Beta DECREASES (becomes more negative)
  Example: 20° → -15° (difference = -35°)

Backward Tilt (chin up):
  Beta INCREASES (becomes more positive)
  Example: 20° → 60° (difference = +40°)
```

---

## Current Implementation

### 1. Calibration Phase

```javascript
// On first reading, store the "neutral" position
if (neutralBeta.current === null && beta !== null) {
  neutralBeta.current = beta  // e.g., 20°
  setCalibrated(true)
  return  // Don't detect tilts yet
}
```

**What happens:**
- When game starts, first beta reading becomes the "zero point"
- This accounts for different head angles and phone positions
- Example: If your head is tilted 20°, that becomes the baseline

### 2. Tilt Detection Phase

```javascript
const tiltDifference = beta - neutralBeta.current

// Forward tilt (chin down) = CORRECT
if (tiltDifference < -35) {
  onCorrect()  // Trigger CORRECT
}

// Backward tilt (chin up) = PASS
if (tiltDifference > 40) {
  onPass()  // Trigger PASS
}
```

**Current Thresholds:**
- **CORRECT**: Tilt forward by **35° or more** (beta decreases)
- **PASS**: Tilt backward by **40° or more** (beta increases)

### 3. Cooldown System

```javascript
const cooldownMs = 1000  // 1 second between tilts
if (now - lastTiltTime.current < cooldownMs) return
```

**Purpose:** Prevents multiple triggers from a single tilt movement

---

## The Math

### Example Scenario

**Initial calibration:**
- Phone on forehead, head at 20° angle
- `neutralBeta = 20°`

**User tilts forward (chin down):**
- Beta changes: `20° → -10°`
- Difference: `-10° - 20° = -30°`
- **Not enough** (need -35°), so no trigger

**User tilts more:**
- Beta changes: `20° → -20°`
- Difference: `-20° - 20° = -40°`
- **Triggers CORRECT!** ✓

**User tilts backward (chin up):**
- Beta changes: `20° → 65°`
- Difference: `65° - 20° = +45°`
- **Triggers PASS!** ✓

---

## Current Issues & Potential Problems

### 1. **Threshold Sensitivity**
- **-35° for CORRECT** might be too strict
- **+40° for PASS** might be too strict
- Users might not tilt enough to trigger

### 2. **Calibration Timing**
- Calibration happens immediately when game starts
- If user moves during calibration, baseline is wrong
- No visual feedback during calibration

### 3. **Beta Angle Variability**
- Beta can be noisy/jumpy
- Small movements might trigger false positives
- Need smoothing/filtering?

### 4. **Orientation Dependencies**
- Beta behavior changes if phone orientation changes
- Landscape left vs landscape right might differ
- Screen rotation affects beta interpretation

### 5. **Device Differences**
- Different phones have different sensor accuracy
- Some devices have more noise than others
- Calibration might need device-specific tuning

---

## Coordinate System Visualization

```
        Phone on Forehead (Landscape)
        
        ┌─────────────┐
        │             │  ← Screen (facing away)
        │   [CARD]    │
        └─────────────┘
           ↑
        Your Head
    
    Beta = 0° (flat)
    
    Forward Tilt (chin down):
        ┌─────────────┐
        │             │  ← Screen tilts up
        │   [CARD]    │     Beta DECREASES
        └─────────────┘
         ↑
      Head tilts
    
    Backward Tilt (chin up):
        ┌─────────────┐
        │             │  ← Screen tilts down
        │   [CARD]    │     Beta INCREASES
        └─────────────┘
           ↑
        Head tilts
```

---

## What We Can Adjust

### 1. **Thresholds**
```javascript
// Make more sensitive (easier to trigger)
if (tiltDifference < -25) {  // Was -35
  onCorrect()
}

// Make less sensitive (harder to trigger)
if (tiltDifference < -45) {  // Was -35
  onCorrect()
}
```

### 2. **Calibration**
- Add delay before calibration starts
- Show "Hold still" message
- Average multiple readings for baseline
- Allow manual recalibration

### 3. **Smoothing**
- Average last N readings to reduce noise
- Use exponential moving average
- Filter out small movements

### 4. **Visual Feedback**
- Show current beta value (debug mode)
- Show tilt direction indicator
- Show calibration status

### 5. **Cooldown**
- Adjust cooldown time (currently 1 second)
- Make it configurable
- Different cooldown for correct vs pass

---

## Testing & Debugging

### To Test Tilt Detection:

1. **Add debug logging:**
```javascript
console.log('Beta:', beta, 'Neutral:', neutralBeta.current, 'Diff:', tiltDifference)
```

2. **Visual indicator:**
- Show current beta value on screen
- Show tilt direction (forward/backward)
- Show if threshold is met

3. **Test different scenarios:**
- Slow tilt vs fast tilt
- Small tilt vs large tilt
- Different head positions
- Different phone orientations

---

## Common Issues

### "Tilt only works backwards"
- **Cause:** Threshold signs might be wrong
- **Fix:** Swap the conditions or invert the difference

### "Too sensitive / triggers accidentally"
- **Cause:** Thresholds too low, or noise in sensor
- **Fix:** Increase thresholds, add smoothing

### "Not sensitive enough / hard to trigger"
- **Cause:** Thresholds too high
- **Fix:** Decrease thresholds

### "Works sometimes but not always"
- **Cause:** Calibration baseline wrong, or orientation changed
- **Fix:** Better calibration, re-calibrate on orientation change

---

## Next Steps for Improvement

1. **Add visual debugging** - Show beta values and tilt direction
2. **Improve calibration** - Better baseline detection
3. **Add smoothing** - Reduce noise in readings
4. **Make thresholds adjustable** - Let users calibrate sensitivity
5. **Better error handling** - Handle edge cases and sensor errors
6. **Test on multiple devices** - Ensure it works across phones

---

## Questions to Answer

1. What threshold values work best for most users?
2. Should we use absolute thresholds or relative to calibration?
3. Do we need smoothing/filtering?
4. Should calibration be automatic or user-initiated?
5. How do we handle different phone orientations?
6. Should we use beta alone or combine with gamma/alpha?

Let me know what specific issues you're experiencing and we can fine-tune the system!

