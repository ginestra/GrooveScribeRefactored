# GrooveScribe Feature Checklist

This document tracks all features to ensure no functionality is lost during refactoring.

## Core Editing Features

### Note Grid Editing
- [ ] Click notes to toggle on/off
- [ ] CTRL + mouse over to turn notes on
- [ ] ALT + mouse over to turn notes off
- [ ] Right-click notes for context menu (special note types)
- [ ] Advanced Edit mode (touch devices)
- [ ] Multiple measures support (1-50 measures)
- [ ] Add/remove measures dynamically
- [ ] Close/open individual measures
- [ ] Close all measures button

### Note Types - Snare
- [ ] Normal snare
- [ ] Accent snare
- [ ] Ghost note
- [ ] Cross stick
- [ ] Buzz stroke
- [ ] Flam
- [ ] Drag

### Note Types - Hi-hat
- [ ] Normal hi-hat
- [ ] Open hi-hat
- [ ] Hi-hat accent
- [ ] Crash
- [ ] Ride
- [ ] Ride bell
- [ ] Cow bell
- [ ] Stacker
- [ ] Click (metronome normal)
- [ ] Click accent (metronome accent)

### Note Types - Kick
- [ ] Normal kick
- [ ] Hi-hat foot (splash)
- [ ] Kick & hi-hat foot

### Note Types - Toms
- [ ] Tom 1 normal
- [ ] Tom 2 normal
- [ ] Floor tom (Tom 4) normal
- [ ] Show/hide toms toggle

### Sticking Notation
- [ ] Right (R) sticking
- [ ] Left (L) sticking
- [ ] Both (R/L) sticking
- [ ] Count sticking
- [ ] Show/hide stickings toggle
- [ ] Reverse R/L stickings
- [ ] Label context menu for bulk sticking operations

### Time Signature
- [ ] Change time signature (1-32/4, 1-32/8, 1-32/16)
- [ ] Time signature popup dialog
- [ ] Time signature display in UI

### Subdivisions
- [ ] 1/8 notes (8ths)
- [ ] 1/16 notes (16ths)
- [ ] 1/32 notes (32nds)
- [ ] 1/8 triplets (12ths)
- [ ] 1/16 triplets (24ths)
- [ ] Mixed division (48ths)

### Label Context Menus
- [ ] Hi-hat label menu (all off, all on, downbeats, upbeats, mute)
- [ ] Snare label menu (all off, all accented, all normal, all ghosts, mute)
- [ ] Kick label menu (all off, all on, HH foot patterns, mute)
- [ ] Tom label menus (all off, all on, mute)
- [ ] Sticking label menu (all off, alternate, all R, all L, counts)

## Playback Features

### MIDI Playback
- [ ] Play/stop button
- [ ] Tempo control (slider and numeric input)
- [ ] Tempo change callback
- [ ] Swing control (0-100%)
- [ ] Loop playback
- [ ] Real-time editing during playback
- [ ] MIDI file generation
- [ ] MIDI file download

### Metronome
- [ ] Metronome off
- [ ] Metronome on 4ths (cowbell on 1, click on 2,3,4)
- [ ] Metronome on 8ths (click on all "ands")
- [ ] Metronome on 16ths (soft click on every 16th, louder on 2,3,4)
- [ ] Metronome solo mode (mutes groove)
- [ ] Auto speed up (increases tempo automatically)
- [ ] Count in (one measure before playback)
- [ ] Offset click (accent e, &, or a instead of 1)
- [ ] Metronome options configuration dialog

### BPM Tapper
- [ ] Tap to find BPM
- [ ] Display calculated BPM
- [ ] Reset button
- [ ] Inactivity timeout

## Sheet Music Features

### ABC Notation
- [ ] Automatic ABC generation from groove
- [ ] ABC notation display (debug mode)
- [ ] Manual ABC editing
- [ ] Re-render from ABC
- [ ] Save ABC to file
- [ ] Title field
- [ ] Author field
- [ ] Comment field
- [ ] Show/hide notation key (legend)

### SVG Rendering
- [ ] SVG sheet music generation
- [ ] Responsive SVG width
- [ ] SVG download
- [ ] PNG export from SVG
- [ ] Print sheet music

## Sharing & Export

### URL Sharing
- [ ] Encode groove in URL
- [ ] Load groove from URL
- [ ] Share URL popup
- [ ] Copy URL to clipboard
- [ ] Short URL option
- [ ] Embed code option
- [ ] Social media sharing buttons

### File Export
- [ ] Download SVG images
- [ ] Download PNG images
- [ ] Download MIDI file
- [ ] Save ABC notation file

## Groove Library

### Groove Menu
- [ ] Rock grooves library
- [ ] Triplet grooves library
- [ ] World grooves library
- [ ] Load groove from library
- [ ] Groove menu popup

### Permutations
- [ ] Kick permutations (16ths)
- [ ] Snare permutations (16ths)
- [ ] Permutation options dialog
- [ ] Count in option
- [ ] Simplify multiple kicks option
- [ ] Use accent grid option
- [ ] Ostinato, singles, doubles, triples options

## UI Features

### View Modes
- [ ] Edit mode
- [ ] View mode (read-only)
- [ ] Switch between edit/view modes

### Toolbar
- [ ] Logo display
- [ ] Metronome controls
- [ ] Permutations button
- [ ] Grooves button
- [ ] Help button

### Left Navigation
- [ ] Time signature button
- [ ] Subdivision buttons
- [ ] View/Edit mode switch
- [ ] Advanced Edit button (touch devices)
- [ ] Undo button

### Bottom Toolbar
- [ ] Clear all notes
- [ ] Show/hide toms
- [ ] Stickings button
- [ ] Download button
- [ ] Print button
- [ ] Share button

## Undo/Redo

- [ ] Undo command (Ctrl-Z)
- [ ] Redo command (Ctrl-Y)
- [ ] Undo stack (max 40 items)
- [ ] Redo stack
- [ ] Undo/redo UI indicators (debug mode)

## Keyboard Shortcuts

- [ ] Spacebar - Start/Stop playback
- [ ] Ctrl-Z - Undo
- [ ] Ctrl-Y - Redo
- [ ] Left Arrow - Tempo down
- [ ] Right Arrow - Tempo up
- [ ] CTRL + mouse over - Turn notes on
- [ ] ALT + mouse over - Turn notes off

## Advanced Features

### GrooveDB Authoring
- [ ] GrooveDB metadata output
- [ ] GrooveDB source textarea
- [ ] GrooveDB authoring mode (query param)

### Debug Mode
- [ ] Debug mode (query param)
- [ ] Undo stack display
- [ ] Redo stack display
- [ ] URL search data display
- [ ] ABC notation display
- [ ] Debug output area

### Context Menus
- [ ] Note context menus (right-click)
- [ ] Label context menus (click on instrument labels)
- [ ] Metronome options context menu
- [ ] Permutation context menu
- [ ] Help context menu
- [ ] Stickings context menu
- [ ] Download context menu

## Data Persistence

- [ ] URL encoding/decoding
- [ ] Bookmark support
- [ ] Browser history support
- [ ] URL parameter parsing

## Responsive & Accessibility

- [ ] Touch device support
- [ ] Mobile-friendly layout
- [ ] Keyboard navigation
- [ ] Screen reader support (to be improved)

## Performance

- [ ] Real-time sheet music updates
- [ ] Efficient DOM updates
- [ ] MIDI playback performance
- [ ] SVG rendering performance

