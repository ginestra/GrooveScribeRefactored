/**
 * MIDIPlayer - MIDI playback controls component
 */

import { BaseComponent } from './BaseComponent.js';

export class MIDIPlayer extends BaseComponent {
  constructor(container, options = {}) {
    super(container, options);
    this.midiService = options.midiService || null;
    this.onPlay = options.onPlay || null;
    this.onStop = options.onStop || null;
    this.onTempoChange = options.onTempoChange || null;
    this.onSwingChange = options.onSwingChange || null;
  }

  /**
   * Render the MIDI player controls
   */
  render() {
    if (!this.container) return;

    const html = this.generatePlayerHTML();
    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Generate HTML for player controls
   * @returns {string} HTML string
   */
  generatePlayerHTML() {
    // Placeholder - needs implementation from original code
    return `
      <div class="playerControl">
        <div class="playerControlsRow">
          <button id="playButton" class="icon-button" aria-label="Play">
            <i class="fa fa-play"></i>
          </button>
          <button id="repeatButton" class="icon-button" aria-label="Repeat">
            <i class="fa fa-repeat"></i>
          </button>
          <input type="range" id="tempoSlider" min="40" max="200" value="80">
          <span id="tempoDisplay">80 BPM</span>
          <input type="range" id="swingSlider" min="0" max="100" value="0">
          <span id="swingDisplay">0%</span>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const playButton = this.container.querySelector('#playButton');
    const repeatButton = this.container.querySelector('#repeatButton');
    const tempoSlider = this.container.querySelector('#tempoSlider');
    const swingSlider = this.container.querySelector('#swingSlider');

    if (playButton) {
      this.addEventListener(playButton, 'click', () => {
        if (this.onPlay) {
          this.onPlay();
        }
      });
    }

    if (repeatButton) {
      this.addEventListener(repeatButton, 'click', () => {
        // Toggle repeat
      });
    }

    if (tempoSlider) {
      this.addEventListener(tempoSlider, 'input', (e) => {
        const tempo = parseInt(e.target.value, 10);
        this.updateTempoDisplay(tempo);
        if (this.onTempoChange) {
          this.onTempoChange(tempo);
        }
      });
    }

    if (swingSlider) {
      this.addEventListener(swingSlider, 'input', (e) => {
        const swing = parseInt(e.target.value, 10);
        this.updateSwingDisplay(swing);
        if (this.onSwingChange) {
          this.onSwingChange(swing);
        }
      });
    }
  }

  /**
   * Update tempo display
   * @param {number} tempo - Tempo in BPM
   */
  updateTempoDisplay(tempo) {
    const display = this.container.querySelector('#tempoDisplay');
    if (display) {
      display.textContent = `${tempo} BPM`;
    }
  }

  /**
   * Update swing display
   * @param {number} swing - Swing percentage
   */
  updateSwingDisplay(swing) {
    const display = this.container.querySelector('#swingDisplay');
    if (display) {
      display.textContent = `${swing}%`;
    }
  }

  /**
   * Update play button state
   * @param {boolean} isPlaying - Whether currently playing
   */
  updatePlayState(isPlaying) {
    const playButton = this.container.querySelector('#playButton');
    if (playButton) {
      const icon = playButton.querySelector('i');
      if (icon) {
        icon.className = isPlaying ? 'fa fa-stop' : 'fa fa-play';
      }
    }
  }
}

