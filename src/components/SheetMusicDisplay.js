/**
 * SheetMusicDisplay - SVG sheet music rendering component
 */

import { BaseComponent } from './BaseComponent.js';

export class SheetMusicDisplay extends BaseComponent {
  constructor(container, options = {}) {
    super(container, options);
    this.svgRenderService = options.svgRenderService || null;
  }

  /**
   * Render sheet music from ABC notation
   * @param {string} abcNotation - ABC notation string
   */
  render(abcNotation) {
    if (!this.container || !this.svgRenderService) return;

    const result = this.svgRenderService.renderABCtoSVG(abcNotation);
    
    // Display SVG
    const svgContainer = this.container.querySelector('.svgTarget') || this.container;
    svgContainer.innerHTML = result.svg;

    // Display errors if any
    if (result.error_html) {
      const errorContainer = document.getElementById('diverr');
      if (errorContainer) {
        errorContainer.innerHTML = result.error_html;
      }
    }
  }

  /**
   * Clear the display
   */
  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

