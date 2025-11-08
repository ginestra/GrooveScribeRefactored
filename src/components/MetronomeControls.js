/**
 * MetronomeControls - Metronome UI and controls component
 */

import { BaseComponent } from './BaseComponent.js';

export class MetronomeControls extends BaseComponent {
  constructor(container, options = {}) {
    super(container, options);
    this.onFrequencyChange = options.onFrequencyChange || null;
    this.onOptionsClick = options.onOptionsClick || null;
  }

  /**
   * Render metronome controls
   */
  render() {
    if (!this.container) return;

    const html = this.generateControlsHTML();
    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Generate HTML for metronome controls
   * @returns {string} HTML string
   */
  generateControlsHTML() {
    return `
      <div id="metronomeContainer">
        <span id="metronomeLabel">METRONOME:</span>
        <button class="metronomeButton" data-frequency="0">OFF</button>
        <button class="metronomeButton" data-frequency="4">4th</button>
        <button class="metronomeButton" data-frequency="8">8th</button>
        <button class="metronomeButton" data-frequency="16">16th</button>
        <button class="metronomeButton Options" id="metronomeOptionsAnchor">Options</button>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const buttons = this.container.querySelectorAll('.metronomeButton[data-frequency]');
    buttons.forEach(button => {
      this.addEventListener(button, 'click', () => {
        const frequency = parseInt(button.dataset.frequency, 10);
        this.setFrequency(frequency);
        if (this.onFrequencyChange) {
          this.onFrequencyChange(frequency);
        }
      });
    });

    const optionsButton = this.container.querySelector('#metronomeOptionsAnchor');
    if (optionsButton) {
      this.addEventListener(optionsButton, 'click', (e) => {
        e.preventDefault();
        if (this.onOptionsClick) {
          this.onOptionsClick(e);
        }
      });
    }
  }

  /**
   * Set metronome frequency and update UI
   * @param {number} frequency - Frequency (0, 4, 8, 16)
   */
  setFrequency(frequency) {
    const buttons = this.container.querySelectorAll('.metronomeButton[data-frequency]');
    buttons.forEach(button => {
      if (parseInt(button.dataset.frequency, 10) === frequency) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }
}

