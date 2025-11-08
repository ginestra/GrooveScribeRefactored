/**
 * NoteGrid - The clickable note grid interface component
 */

import { BaseComponent } from './BaseComponent.js';

export class NoteGrid extends BaseComponent {
  constructor(container, options = {}) {
    super(container, options);
    this.onNoteClick = options.onNoteClick || null;
    this.onNoteRightClick = options.onNoteRightClick || null;
    this.onNoteMouseEnter = options.onNoteMouseEnter || null;
  }

  /**
   * Render the note grid
   * @param {Object} grooveData - Groove data model
   */
  render(grooveData) {
    if (!this.container) return;

    // This will generate the HTML for the note grid
    // Implementation will be extracted from groove_writer.js HTMLforStaffContainer
    const html = this.generateGridHTML(grooveData);
    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Generate HTML for the note grid
   * @param {Object} grooveData - Groove data
   * @returns {string} HTML string
   */
  generateGridHTML(grooveData) {
    // Placeholder - needs full implementation from original code
    return '<div class="note-grid">Note grid will be rendered here</div>';
  }

  /**
   * Attach event listeners to note elements
   */
  attachEventListeners() {
    const notes = this.container.querySelectorAll('[data-note-id]');
    notes.forEach(note => {
      this.addEventListener(note, 'click', (e) => {
        if (this.onNoteClick) {
          this.onNoteClick(e, note.dataset.noteId);
        }
      });

      this.addEventListener(note, 'contextmenu', (e) => {
        e.preventDefault();
        if (this.onNoteRightClick) {
          this.onNoteRightClick(e, note.dataset.noteId);
        }
      });

      this.addEventListener(note, 'mouseenter', (e) => {
        if (this.onNoteMouseEnter) {
          this.onNoteMouseEnter(e, note.dataset.noteId);
        }
      });
    });
  }

  /**
   * Update note state visually
   * @param {string} noteId - Note ID
   * @param {string} state - New state
   */
  updateNoteState(noteId, state) {
    const noteElement = this.container.querySelector(`[data-note-id="${noteId}"]`);
    if (noteElement) {
      // Update visual state
      this.applyNoteState(noteElement, state);
    }
  }

  /**
   * Apply visual state to note element
   * @param {HTMLElement} element - Note element
   * @param {string} state - Note state
   */
  applyNoteState(element, state) {
    // Implementation needed
  }
}

