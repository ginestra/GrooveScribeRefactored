# Implementation Guide

## Overview

The refactoring has established a modern architecture with clear separation of concerns. The structure is in place, but detailed implementations need to be extracted from the original monolithic files.

## Architecture Structure

```
src/
├── models/              ✅ Complete
│   ├── GrooveModel.js
│   ├── NoteModel.js
│   ├── MetronomeModel.js
│   └── UndoRedoManager.js
├── services/            ⚠️ Placeholders - needs implementation
│   ├── ABCNotationService.js
│   ├── MIDIService.js
│   ├── SVGRenderService.js
│   ├── URLStateService.js
│   └── ExportService.js
├── components/          ⚠️ Placeholders - needs implementation
│   ├── BaseComponent.js
│   ├── NoteGrid.js
│   ├── SheetMusicDisplay.js
│   ├── MIDIPlayer.js
│   ├── MetronomeControls.js
│   ├── TimeSignatureSelector.js
│   ├── DivisionSelector.js
│   └── ContextMenu.js
├── controllers/         ⚠️ Skeleton - needs implementation
│   └── GrooveWriterController.js
└── utils/
    └── constants.js     ✅ Complete

css/
├── base/                ✅ Complete
├── components/          ✅ Complete
├── layout/              ✅ Complete
├── themes/              ✅ Complete
└── main.css             ✅ Complete
```

## Next Steps for Full Implementation

### 1. Service Layer Implementation

#### ABCNotationService
- Extract `createABCFromGrooveData` from `groove_utils.js`
- Extract `getTopABCBoilerPlate` logic
- Extract `createABCFromNoteArrays` logic
- Extract `scaleNoteArrayToFullSize` logic
- Extract tablature to ABC conversion logic

#### MIDIService
- Extract MIDI initialization from `groove_utils.js`
- Extract MIDI file generation using jsmidgen
- Extract playback control logic
- Integrate with MIDI.js library
- Handle metronome MIDI generation

#### SVGRenderService
- Integrate with abc2svg library
- Extract SVG rendering logic
- Handle error reporting
- Extract note mapping for highlighting

#### URLStateService
- Complete `encodeNoteArray` implementation
- Complete `decodeNoteString` implementation
- Extract note state encoding/decoding from original code
- Ensure URL compatibility with existing sharing

### 2. Component Implementation

#### NoteGrid
- Extract `HTMLforStaffContainer` from `groove_writer.js`
- Implement note rendering for all instruments
- Implement note state management
- Handle CTRL/ALT modifiers for bulk operations
- Implement right-click context menus

#### SheetMusicDisplay
- Complete SVG rendering integration
- Handle responsive width calculation
- Display error messages

#### MIDIPlayer
- Extract player control HTML generation
- Implement tempo slider
- Implement swing slider
- Handle play/stop/repeat states
- Integrate with MIDIService

#### Other Components
- Complete rendering logic for all components
- Extract HTML generation from original code
- Implement event handling

### 3. Controller Implementation

#### GrooveWriterController
- Complete all handler methods
- Integrate with existing DOM structure
- Handle all keyboard shortcuts
- Implement undo/redo with URL state
- Coordinate all components and services

### 4. Migration Strategy

1. **Phase 1: Parallel Implementation**
   - Keep original code running
   - Implement new architecture alongside
   - Test new components in isolation

2. **Phase 2: Gradual Migration**
   - Replace one feature at a time
   - Use feature flags to toggle between old/new
   - Test thoroughly after each migration

3. **Phase 3: Complete Migration**
   - Remove old code
   - Clean up unused files
   - Final testing

### 5. Testing Checklist

Use FEATURE_CHECKLIST.md to test:
- [ ] All note types work correctly
- [ ] All subdivisions work
- [ ] Time signature changes work
- [ ] MIDI playback works
- [ ] Metronome works
- [ ] Sheet music rendering works
- [ ] URL sharing works
- [ ] Undo/redo works
- [ ] Keyboard shortcuts work
- [ ] Export functions work
- [ ] All context menus work
- [ ] Permutations work
- [ ] Groove library works

## Key Files to Reference

### Original Implementation
- `js/groove_writer.js` - Main authoring logic (4700+ lines)
- `js/groove_utils.js` - Utility functions (3400+ lines)
- `js/groove_display.js` - Display logic
- `index.html` - HTML structure with inline handlers

### New Architecture
- `src/controllers/GrooveWriterController.js` - Main controller
- `src/services/*.js` - Service implementations needed
- `src/components/*.js` - Component implementations needed

## Important Notes

1. **Backward Compatibility**: URL encoding/decoding must remain compatible
2. **Library Integration**: Must work with existing libraries (MIDI.js, abc2svg, jsmidgen)
3. **No Tailwind CSS**: Using regular CSS with custom properties as requested
4. **ES6 Modules**: All new code uses ES6 module syntax
5. **Feature Preservation**: All features from FEATURE_CHECKLIST.md must work

## Build and Run

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Style

- Use ESLint for linting: `npm run lint`
- Use Prettier for formatting: `npm run format`
- Follow existing code patterns where possible
- Add JSDoc comments for all public methods

