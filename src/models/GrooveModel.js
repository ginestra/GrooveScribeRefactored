/**
 * GrooveModel - Core data structure for groove notes, measures, and time signatures
 */

import { DEFAULT_TEMPO, NUMBER_OF_TOMS } from '../utils/constants.js';

export class GrooveModel {
  constructor() {
    this.notesPerMeasure = 16;
    this.timeDivision = 16;
    this.numberOfMeasures = 1;
    this.numBeats = 4; // TimeSigTop: Top part of Time Signature 3/4, 4/4, 5/4, 6/8, etc...
    this.noteValue = 4; // TimeSigBottom: Bottom part of Time Sig 4 = quarter notes, 8 = 8th notes, 16ths, etc..
    
    // Note arrays - each is an array of 32 booleans/strings representing note states
    this.sticking_array = this.createEmptyNoteArray();
    this.hh_array = this.createEmptyNoteArray();
    this.snare_array = this.createEmptyNoteArray();
    this.kick_array = this.createEmptyNoteArray();
    
    // Toms array contains 4 toms T1, T2, T3, T4 index starting at zero
    this.toms_array = Array(NUMBER_OF_TOMS).fill(null).map(() => this.createEmptyNoteArray());
    
    // UI state
    this.showToms = false;
    this.showStickings = false;
    
    // Metadata
    this.title = "";
    this.author = "";
    this.comments = "";
    this.showLegend = false;
    
    // Playback
    this.swingPercent = 0;
    this.tempo = DEFAULT_TEMPO;
    this.kickStemsUp = true;
    this.metronomeFrequency = 0; // 0, 4, 8, 16
  }

  createEmptyNoteArray() {
    // Returns array of 32 false values (32nd note resolution)
    return new Array(32).fill(false);
  }

  // Calculate notes per measure from division and time signature
  calculateNotesPerMeasure(division, timeSigTop, timeSigBottom) {
    return (division / timeSigBottom) * timeSigTop;
  }

  updateNotesPerMeasure() {
    this.notesPerMeasure = this.calculateNotesPerMeasure(
      this.timeDivision,
      this.numBeats,
      this.noteValue
    );
  }

  setTimeSignature(numBeats, noteValue) {
    this.numBeats = numBeats;
    this.noteValue = noteValue;
    this.updateNotesPerMeasure();
  }

  setDivision(division) {
    this.timeDivision = division;
    this.updateNotesPerMeasure();
  }

  setNumberOfMeasures(measures) {
    this.numberOfMeasures = Math.max(1, Math.min(50, measures));
  }

  addMeasure() {
    if (this.numberOfMeasures < 50) {
      this.numberOfMeasures++;
    }
  }

  removeMeasure() {
    if (this.numberOfMeasures > 1) {
      this.numberOfMeasures--;
    }
  }

  clearAllNotes() {
    this.sticking_array = this.createEmptyNoteArray();
    this.hh_array = this.createEmptyNoteArray();
    this.snare_array = this.createEmptyNoteArray();
    this.kick_array = this.createEmptyNoteArray();
    this.toms_array = Array(NUMBER_OF_TOMS).fill(null).map(() => this.createEmptyNoteArray());
  }

  // Create a copy of the groove data
  clone() {
    const clone = new GrooveModel();
    clone.notesPerMeasure = this.notesPerMeasure;
    clone.timeDivision = this.timeDivision;
    clone.numberOfMeasures = this.numberOfMeasures;
    clone.numBeats = this.numBeats;
    clone.noteValue = this.noteValue;
    clone.sticking_array = [...this.sticking_array];
    clone.hh_array = [...this.hh_array];
    clone.snare_array = [...this.snare_array];
    clone.kick_array = [...this.kick_array];
    clone.toms_array = this.toms_array.map(arr => [...arr]);
    clone.showToms = this.showToms;
    clone.showStickings = this.showStickings;
    clone.title = this.title;
    clone.author = this.author;
    clone.comments = this.comments;
    clone.showLegend = this.showLegend;
    clone.swingPercent = this.swingPercent;
    clone.tempo = this.tempo;
    clone.kickStemsUp = this.kickStemsUp;
    clone.metronomeFrequency = this.metronomeFrequency;
    return clone;
  }
}

