/**
 * DivisionSelector - Subdivision selection component (8ths, 16ths, etc.)
 */

import { BaseComponent } from './BaseComponent.js';

export class DivisionSelector extends BaseComponent {
  constructor(container, options = {}) {
    super(container, options);
    this.onDivisionChange = options.onDivisionChange || null;
    this.currentDivision = 16;
  }

  /**
   * Render division selector
   */
  render() {
    if (!this.container) return;

    const html = this.generateSelectorHTML();
    this.container.innerHTML = html;
    this.attachEventListeners();
    this.updateSelection();
  }

  /**
   * Generate HTML for division selector
   * @returns {string} HTML string
   */
  generateSelectorHTML() {
    return `
      <span class="left-button subdivision" id="subdivision_8ths" data-division="8">
        <span class="left-button-content">
          <span class="buttonFraction"><sup>1</sup>/<sub>8</sub></span>NOTES
        </span>
      </span>
      <span class="left-button subdivision" id="subdivision_16ths" data-division="16">
        <span class="left-button-content">
          <span class="buttonFraction"><sup>1</sup>/<sub>16</sub></span>NOTES
        </span>
      </span>
      <span class="left-button subdivision" id="subdivision_32ths" data-division="32">
        <span class="left-button-content">
          <span class="buttonFraction"><sup>1</sup>/<sub>32</sub></span>NOTES
        </span>
      </span>
      <span class="left-button subdivision" id="subdivision_12ths" data-division="12">
        <span class="left-button-content">
          <span class="buttonFraction"><sup>1</sup>/<sub>8</sub></span>TRIPLETS
        </span>
      </span>
      <span class="left-button subdivision" id="subdivision_24ths" data-division="24">
        <span class="left-button-content">
          <span class="buttonFraction"><sup>1</sup>/<sub>16</sub></span>TRIPLETS
        </span>
      </span>
      <span class="left-button subdivision" id="subdivision_48ths" data-division="48">
        <span class="left-button-content">MIXED<br>Division</span>
      </span>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const buttons = this.container.querySelectorAll('.subdivision[data-division]');
    buttons.forEach(button => {
      this.addEventListener(button, 'click', () => {
        const division = parseInt(button.dataset.division, 10);
        this.setDivision(division);
      });
    });
  }

  /**
   * Set division and update UI
   * @param {number} division - Division value
   */
  setDivision(division) {
    this.currentDivision = division;
    this.updateSelection();
    if (this.onDivisionChange) {
      this.onDivisionChange(division);
    }
  }

  /**
   * Update selection visual state
   */
  updateSelection() {
    const buttons = this.container.querySelectorAll('.subdivision[data-division]');
    buttons.forEach(button => {
      if (parseInt(button.dataset.division, 10) === this.currentDivision) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }
}

