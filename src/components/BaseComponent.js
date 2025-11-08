/**
 * BaseComponent - Base class for all UI components
 */

export class BaseComponent {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' 
      ? document.querySelector(container) || document.getElementById(container)
      : container;
    this.options = options;
    this.eventListeners = [];
  }

  /**
   * Render the component
   * @returns {HTMLElement}
   */
  render() {
    throw new Error('render() must be implemented by subclass');
  }

  /**
   * Add event listener
   * @param {HTMLElement} element - Element to attach listener to
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  addEventListener(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);
      this.eventListeners.push({ element, event, handler });
    }
  }

  /**
   * Remove all event listeners
   */
  destroy() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
  }

  /**
   * Show component
   */
  show() {
    if (this.container) {
      this.container.style.display = '';
    }
  }

  /**
   * Hide component
   */
  hide() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }
}

