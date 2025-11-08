/**
 * GrooveWriterController - Main application controller
 * Coordinates models, services, and components
 */

import { GrooveModel } from '../models/GrooveModel.js';
import { MetronomeModel } from '../models/MetronomeModel.js';
import { UndoRedoManager } from '../models/UndoRedoManager.js';
import { ABCNotationService } from '../services/ABCNotationService.js';
import { MIDIService } from '../services/MIDIService.js';
import { SVGRenderService } from '../services/SVGRenderService.js';
import { URLStateService } from '../services/URLStateService.js';
import { ExportService } from '../services/ExportService.js';
import { NoteGrid } from '../components/NoteGrid.js';
import { SheetMusicDisplay } from '../components/SheetMusicDisplay.js';
import { MIDIPlayer } from '../components/MIDIPlayer.js';
import { MetronomeControls } from '../components/MetronomeControls.js';
import { TimeSignatureSelector } from '../components/TimeSignatureSelector.js';
import { DivisionSelector } from '../components/DivisionSelector.js';

export class GrooveWriterController {
  constructor() {
    // Models
    this.grooveModel = new GrooveModel();
    this.metronomeModel = new MetronomeModel();
    this.undoRedoManager = new UndoRedoManager();

    // Services
    this.abcService = new ABCNotationService();
    this.midiService = new MIDIService();
    this.svgService = new SVGRenderService();
    this.urlService = new URLStateService();
    this.exportService = new ExportService();

    // Components
    this.noteGrid = null;
    this.sheetMusicDisplay = null;
    this.midiPlayer = null;
    this.metronomeControls = null;
    this.timeSignatureSelector = null;
    this.divisionSelector = null;

    // State
    this.isInitialized = false;
  }

  /**
   * Initialize the controller
   */
  async initialize() {
    if (this.isInitialized) return;

    // Initialize services
    await this.midiService.initialize();
    this.svgService.initialize(typeof Abc !== 'undefined' ? Abc : null);

    // Initialize components
    this.initializeComponents();

    // Load initial state from URL
    this.loadFromURL();

    // Set up keyboard shortcuts
    this.setupKeyboardShortcuts();

    this.isInitialized = true;
  }

  /**
   * Initialize UI components
   */
  initializeComponents() {
    // Note Grid
    const noteGridContainer = document.getElementById('musicalInput');
    if (noteGridContainer) {
      this.noteGrid = new NoteGrid(noteGridContainer, {
        onNoteClick: (e, noteId) => this.handleNoteClick(e, noteId),
        onNoteRightClick: (e, noteId) => this.handleNoteRightClick(e, noteId),
        onNoteMouseEnter: (e, noteId) => this.handleNoteMouseEnter(e, noteId)
      });
    }

    // Sheet Music Display
    const sheetMusicContainer = document.getElementById('sheetMusicDiv');
    if (sheetMusicContainer) {
      this.sheetMusicDisplay = new SheetMusicDisplay(sheetMusicContainer, {
        svgRenderService: this.svgService
      });
    }

    // MIDI Player
    const midiPlayerContainer = document.getElementById('midiPlayer');
    if (midiPlayerContainer) {
      this.midiPlayer = new MIDIPlayer(midiPlayerContainer, {
        midiService: this.midiService,
        onPlay: () => this.handlePlay(),
        onStop: () => this.handleStop(),
        onTempoChange: (tempo) => this.handleTempoChange(tempo),
        onSwingChange: (swing) => this.handleSwingChange(swing)
      });
      this.midiPlayer.render();
    }

    // Metronome Controls
    const metronomeContainer = document.getElementById('metronomeContainer');
    if (metronomeContainer) {
      this.metronomeControls = new MetronomeControls(metronomeContainer, {
        onFrequencyChange: (freq) => this.handleMetronomeFrequencyChange(freq),
        onOptionsClick: (e) => this.handleMetronomeOptionsClick(e)
      });
      this.metronomeControls.render();
    }

    // Time Signature Selector
    const timeSigContainer = document.getElementById('timeLabel');
    if (timeSigContainer) {
      this.timeSignatureSelector = new TimeSignatureSelector(timeSigContainer, {
        onTimeSignatureChange: (top, bottom) => this.handleTimeSignatureChange(top, bottom)
      });
      this.timeSignatureSelector.render();
    }

    // Division Selector
    const divisionContainer = document.getElementById('divisionButtonContainer');
    if (divisionContainer) {
      this.divisionSelector = new DivisionSelector(divisionContainer, {
        onDivisionChange: (division) => this.handleDivisionChange(division)
      });
      this.divisionSelector.render();
    }
  }

  /**
   * Handle note click
   */
  handleNoteClick(event, noteId) {
    // Implementation needed
    this.updateSheetMusic();
  }

  /**
   * Handle note right click
   */
  handleNoteRightClick(event, noteId) {
    // Show context menu
  }

  /**
   * Handle note mouse enter
   */
  handleNoteMouseEnter(event, noteId) {
    // Handle CTRL/ALT modifiers
  }

  /**
   * Handle play button
   */
  handlePlay() {
    if (this.midiService.getIsPlaying()) {
      this.midiService.stop();
      if (this.midiPlayer) {
        this.midiPlayer.updatePlayState(false);
      }
    } else {
      this.midiService.play(this.grooveModel, this.metronomeModel);
      if (this.midiPlayer) {
        this.midiPlayer.updatePlayState(true);
      }
    }
  }

  /**
   * Handle stop button
   */
  handleStop() {
    this.midiService.stop();
    if (this.midiPlayer) {
      this.midiPlayer.updatePlayState(false);
    }
  }

  /**
   * Handle tempo change
   */
  handleTempoChange(tempo) {
    this.grooveModel.tempo = tempo;
    this.midiService.setTempo(tempo);
    this.updateURL();
  }

  /**
   * Handle swing change
   */
  handleSwingChange(swing) {
    this.grooveModel.swingPercent = swing;
    this.midiService.setSwing(swing);
    this.updateURL();
  }

  /**
   * Handle metronome frequency change
   */
  handleMetronomeFrequencyChange(frequency) {
    this.metronomeModel.setFrequency(frequency);
    this.grooveModel.metronomeFrequency = frequency;
    this.updateURL();
  }

  /**
   * Handle metronome options click
   */
  handleMetronomeOptionsClick(event) {
    // Show metronome options menu
  }

  /**
   * Handle time signature change
   */
  handleTimeSignatureChange(top, bottom) {
    this.grooveModel.setTimeSignature(top, bottom);
    this.updateSheetMusic();
    this.updateURL();
  }

  /**
   * Handle division change
   */
  handleDivisionChange(division) {
    this.grooveModel.setDivision(division);
    if (this.noteGrid) {
      this.noteGrid.render(this.grooveModel);
    }
    this.updateSheetMusic();
    this.updateURL();
  }

  /**
   * Update sheet music display
   */
  updateSheetMusic() {
    if (!this.sheetMusicDisplay) return;

    const renderWidth = 600; // Calculate from container
    const abcNotation = this.abcService.createABCFromGrooveData(this.grooveModel, renderWidth);
    this.sheetMusicDisplay.render(abcNotation);
  }

  /**
   * Update URL with current state
   */
  updateURL() {
    const url = this.urlService.getUrlStringFromGrooveData(this.grooveModel);
    this.undoRedoManager.addToUndoStack(url);
    window.history.replaceState(null, '', url);
  }

  /**
   * Load state from URL
   */
  loadFromURL() {
    const grooveData = this.urlService.getGrooveDataFromUrlString(window.location.search);
    if (grooveData) {
      this.grooveModel = grooveData;
      if (this.noteGrid) {
        this.noteGrid.render(this.grooveModel);
      }
      this.updateSheetMusic();
    }
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Spacebar - Play/Stop
      if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        this.handlePlay();
      }

      // Ctrl+Z - Undo
      if (e.ctrlKey && e.code === 'KeyZ' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      }

      // Ctrl+Y or Ctrl+Shift+Z - Redo
      if ((e.ctrlKey && e.code === 'KeyY') || (e.ctrlKey && e.shiftKey && e.code === 'KeyZ')) {
        e.preventDefault();
        this.redo();
      }

      // Left Arrow - Tempo down
      if (e.code === 'ArrowLeft' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        this.grooveModel.tempo = Math.max(40, this.grooveModel.tempo - 1);
        this.handleTempoChange(this.grooveModel.tempo);
      }

      // Right Arrow - Tempo up
      if (e.code === 'ArrowRight' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        this.grooveModel.tempo = Math.min(200, this.grooveModel.tempo + 1);
        this.handleTempoChange(this.grooveModel.tempo);
      }
    });
  }

  /**
   * Undo command
   */
  undo() {
    const state = this.undoRedoManager.undo();
    if (state) {
      const grooveData = this.urlService.getGrooveDataFromUrlString(state);
      if (grooveData) {
        this.grooveModel = grooveData;
        if (this.noteGrid) {
          this.noteGrid.render(this.grooveModel);
        }
        this.updateSheetMusic();
      }
    }
  }

  /**
   * Redo command
   */
  redo() {
    const state = this.undoRedoManager.redo();
    if (state) {
      const grooveData = this.urlService.getGrooveDataFromUrlString(state);
      if (grooveData) {
        this.grooveModel = grooveData;
        if (this.noteGrid) {
          this.noteGrid.render(this.grooveModel);
        }
        this.updateSheetMusic();
      }
    }
  }
}

