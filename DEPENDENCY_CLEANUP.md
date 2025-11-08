# Dependency Cleanup Notes

## Font Awesome
- **Current**: Both 4.3.0 and 4.7.0 are present in the repository
- **Action**: Remove font-awesome/4.3.0 directory (keeping only 4.7.0)
- **Status**: Note added to index.html, directory removal can be done manually or via git

## Build Dependencies
- Added package.json with Vite for modern build system
- ESLint and Prettier for code quality

## External Libraries (kept as-is)
- MIDI.js - Required for audio playback
- abc2svg - Required for sheet music rendering
- jsmidgen - Required for MIDI file generation
- pablo.js - Required for SVG to PNG conversion
- jQuery 3.7.1 - Currently used, can be phased out in future
- share-button - For social sharing

## Recommendations
1. Consider updating Font Awesome to a newer version (5.x or 6.x) in future
2. Consider replacing jQuery with vanilla JavaScript or modern framework
3. Keep all MIDI and music-related libraries as they are core dependencies

