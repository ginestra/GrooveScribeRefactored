/**
 * UndoRedoManager - Manages undo/redo functionality
 */

import { UNDO_STACK_MAX_SIZE } from '../utils/constants.js';

export class UndoRedoManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
    this.maxSize = UNDO_STACK_MAX_SIZE;
  }

  /**
   * Add a state to the undo stack
   * @param {string} state - The state to add (typically a URL fragment)
   * @param {boolean} clearRedo - Whether to clear the redo stack
   * @returns {boolean} True if state was added, false if it's the same as current
   */
  addToUndoStack(state, clearRedo = true) {
    // Don't add if it's the same as the current state
    if (this.undoStack.length > 0 && this.undoStack[this.undoStack.length - 1] === state) {
      return false;
    }

    this.undoStack.push(state);
    
    // Keep stack at manageable size
    while (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }

    if (clearRedo) {
      this.redoStack = [];
    }

    return true;
  }

  /**
   * Undo - move current state to redo stack and return previous state
   * @returns {string|null} The previous state, or null if nothing to undo
   */
  undo() {
    if (this.undoStack.length > 1) {
      const currentState = this.undoStack.pop();
      this.redoStack.push(currentState);
      return this.undoStack[this.undoStack.length - 1];
    }
    return null;
  }

  /**
   * Redo - move state from redo stack back to undo stack
   * @returns {string|null} The state to redo, or null if nothing to redo
   */
  redo() {
    if (this.redoStack.length > 0) {
      const state = this.redoStack.pop();
      this.undoStack.push(state);
      return state;
    }
    return null;
  }

  /**
   * Check if undo is available
   * @returns {boolean}
   */
  canUndo() {
    return this.undoStack.length > 1;
  }

  /**
   * Check if redo is available
   * @returns {boolean}
   */
  canRedo() {
    return this.redoStack.length > 0;
  }

  /**
   * Clear both stacks
   */
  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * Get current state
   * @returns {string|null}
   */
  getCurrentState() {
    if (this.undoStack.length > 0) {
      return this.undoStack[this.undoStack.length - 1];
    }
    return null;
  }

  /**
   * Get undo stack for debugging
   * @returns {string[]}
   */
  getUndoStack() {
    return [...this.undoStack];
  }

  /**
   * Get redo stack for debugging
   * @returns {string[]}
   */
  getRedoStack() {
    return [...this.redoStack];
  }
}

