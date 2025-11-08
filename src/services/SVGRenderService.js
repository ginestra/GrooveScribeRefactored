/**
 * SVGRenderService - Handles SVG rendering from ABC notation
 */

export class SVGRenderService {
  constructor() {
    this.abcRenderer = null; // Will be initialized with abc2svg library
  }

  /**
   * Initialize ABC renderer
   * @param {Object} abcRenderer - ABC2SVG renderer instance
   */
  initialize(abcRenderer) {
    this.abcRenderer = abcRenderer;
  }

  /**
   * Render ABC notation to SVG
   * @param {string} abcNotation - ABC notation string
   * @returns {Object} Object with svg and error_html properties
   */
  renderABCtoSVG(abcNotation) {
    if (!this.abcRenderer) {
      // Fallback: try to use global abc2svg if available
      if (typeof Abc !== 'undefined' && Abc.renderAbc) {
        return this.renderWithAbc2Svg(abcNotation);
      }
      return {
        svg: '<p>ABC renderer not initialized</p>',
        error_html: '<p>Error: ABC renderer not available</p>'
      };
    }

    return this.renderWithAbc2Svg(abcNotation);
  }

  /**
   * Render using abc2svg library
   * @param {string} abcNotation - ABC notation string
   * @returns {Object} Object with svg and error_html properties
   */
  renderWithAbc2Svg(abcNotation) {
    try {
      // This will use the abc2svg library
      // The actual implementation depends on how abc2svg is loaded
      if (typeof Abc !== 'undefined' && Abc.renderAbc) {
        const result = Abc.renderAbc('svgTarget', abcNotation, {
          responsive: 'resize',
          scale: 1.0
        });

        // Extract SVG from result
        const svgElement = document.getElementById('svgTarget');
        let svg = '';
        let error_html = '';

        if (svgElement && svgElement.innerHTML) {
          svg = svgElement.innerHTML;
        } else if (result && result[0] && result[0].svg) {
          svg = result[0].svg;
        }

        if (result && result[0] && result[0].warnings) {
          error_html = '<p>Warnings: ' + result[0].warnings.join(', ') + '</p>';
        }

        return { svg, error_html };
      }

      return {
        svg: '<p>ABC renderer not available</p>',
        error_html: '<p>Error: ABC2SVG library not loaded</p>'
      };
    } catch (error) {
      console.error('Error rendering ABC to SVG:', error);
      return {
        svg: '<p>Error rendering music</p>',
        error_html: '<p>Error: ' + error.message + '</p>'
      };
    }
  }

  /**
   * Get SVG element from rendered output
   * @param {string} targetId - Target element ID
   * @returns {HTMLElement|null} SVG element or null
   */
  getSVGElement(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      const svg = target.querySelector('svg');
      return svg || null;
    }
    return null;
  }
}

