/**
 * TimeSignatureSelector - Time signature selection UI component
 */

import { BaseComponent } from './BaseComponent.js';

export class TimeSignatureSelector extends BaseComponent {
  constructor(container, options = {}) {
    super(container, options);
    this.onTimeSignatureChange = options.onTimeSignatureChange || null;
    this.currentTimeSig = { top: 4, bottom: 4 };
  }

  /**
   * Render time signature selector
   */
  render() {
    if (!this.container) return;

    const html = this.generateSelectorHTML();
    this.container.innerHTML = html;
    this.attachEventListeners();
    this.updateDisplay();
  }

  /**
   * Generate HTML for time signature selector
   * @returns {string} HTML string
   */
  generateSelectorHTML() {
    return `
      <span id="timeLabel" class="left-button">
        <span class="left-button-content">
          <span id="timeSigLabel" class="buttonFraction">
            <sup>4</sup>/<sub>4</sub>
          </span>
          <span id="timeSubLabel">TIME</span>
        </span>
      </span>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const timeLabel = this.container.querySelector('#timeLabel');
    if (timeLabel) {
      this.addEventListener(timeLabel, 'click', () => {
        this.showPopup();
      });
    }
  }

  /**
   * Show time signature popup
   */
  showPopup() {
    // Implementation needed - show popup dialog
    if (this.onTimeSignatureChange) {
      // For now, just trigger callback
    }
  }

  /**
   * Set time signature
   * @param {number} top - Top number
   * @param {number} bottom - Bottom number
   */
  setTimeSignature(top, bottom) {
    this.currentTimeSig = { top, bottom };
    this.updateDisplay();
    if (this.onTimeSignatureChange) {
      this.onTimeSignatureChange(top, bottom);
    }
  }

  /**
   * Update display
   */
  updateDisplay() {
    const label = this.container.querySelector('#timeSigLabel');
    if (label) {
      label.innerHTML = `<sup>${this.currentTimeSig.top}</sup>/<sub>${this.currentTimeSig.bottom}</sub>`;
    }
  }
}

