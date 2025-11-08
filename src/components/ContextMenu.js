/**
 * ContextMenu - Reusable context menu component
 */

import { BaseComponent } from './BaseComponent.js';

export class ContextMenu extends BaseComponent {
  constructor(container, options = {}) {
    super(container, options);
    this.items = options.items || [];
    this.onItemClick = options.onItemClick || null;
  }

  /**
   * Show context menu at position
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  show(x, y) {
    if (!this.container) return;

    this.render();
    this.container.style.display = 'block';
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;

    // Close on document click
    const closeHandler = (e) => {
      if (!this.container.contains(e.target)) {
        this.hide();
        document.removeEventListener('click', closeHandler);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', closeHandler);
    }, 100);
  }

  /**
   * Hide context menu
   */
  hide() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  /**
   * Render context menu
   */
  render() {
    if (!this.container) return;

    const html = `
      <ul class="list">
        ${this.items.map(item => `
          <li class="${item.checked ? 'menuChecked' : ''}" 
              data-action="${item.action}"
              title="${item.title || ''}">
            ${item.label}
          </li>
        `).join('')}
      </ul>
    `;
    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const items = this.container.querySelectorAll('li[data-action]');
    items.forEach(item => {
      this.addEventListener(item, 'click', () => {
        const action = item.dataset.action;
        if (this.onItemClick) {
          this.onItemClick(action);
        }
        this.hide();
      });
    });
  }

  /**
   * Set menu items
   * @param {Array} items - Menu items
   */
  setItems(items) {
    this.items = items;
  }
}

