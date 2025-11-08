/**
 * NoteModel - Represents a single note in a groove
 * Handles note state and validation
 */

export class NoteModel {
  constructor(instrument, noteIndex) {
    this.instrument = instrument; // 'snare', 'kick', 'hihat', 'tom1', 'tom2', 'tom4', 'sticking'
    this.noteIndex = noteIndex;
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    switch (this.instrument) {
      case 'snare':
        return 'off';
      case 'kick':
        return 'off';
      case 'hihat':
        return 'off';
      case 'tom1':
      case 'tom2':
      case 'tom4':
        return 'off';
      case 'sticking':
        return 'off';
      default:
        return 'off';
    }
  }

  setState(newState) {
    this.state = newState;
  }

  getState() {
    return this.state;
  }

  isOn() {
    return this.state !== 'off';
  }

  // Convert state to ABC notation
  toABC() {
    // This will be implemented with ABC constants
    return false; // off
  }

  // Convert state to URL encoding
  toURL() {
    if (this.state === 'off') {
      return '-';
    }
    // URL encoding will be implemented based on instrument type
    return 'x';
  }
}

