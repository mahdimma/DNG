# Video Controls Components

This directory contains the modular video control components split from the main VideoControls component.

## Component Structure

### Main Component
- **VideoControls.js** - Main container component that orchestrates all sub-components

### Sub-components
- **ProgressBar.js** - Handles video progress display and seeking functionality
- **PlayButton.js** - Simple play/pause button component
- **TimeDisplay.js** - Shows current time and total duration
- **VolumeControl.js** - Volume button and slider with hover functionality

### Utilities
- **utils.js** - Shared utility functions:
  - `toPersianNumbers()` - Converts numbers to Persian digits
  - `isRTL()` - Detects RTL language direction
  - `formatDisplayTime()` - Formats time with RTL support

### Index
- **index.js** - Barrel export for easy importing of all components

## Usage

```javascript
import VideoControls from './VideoControls';
// or import individual components
import { ProgressBar, PlayButton, TimeDisplay, VolumeControl } from './video-controls';
```

## Features

- **RTL Support**: All components support right-to-left languages (Persian/Arabic)
- **Responsive Design**: Components adapt to different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard support
- **Smooth Animations**: CSS transitions and hover effects
- **Touch Support**: Works on mobile devices
- **Persian Numerals**: Automatic conversion for RTL languages
