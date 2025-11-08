/**
 * Main Application Entry Point
 * Initializes the GrooveScribe application
 */

import { GrooveWriterController } from './controllers/GrooveWriterController.js';

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Create and initialize the main controller
    const controller = new GrooveWriterController();
    window.grooveWriterController = controller; // Make available globally for debugging
    
    await controller.initialize();
    
    console.log('GrooveScribe initialized successfully');
  } catch (error) {
    console.error('Error initializing GrooveScribe:', error);
  }
});

// Also support window.onload for compatibility
window.addEventListener('load', async () => {
  if (!window.grooveWriterController) {
    try {
      const controller = new GrooveWriterController();
      window.grooveWriterController = controller;
      await controller.initialize();
    } catch (error) {
      console.error('Error initializing GrooveScribe on window load:', error);
    }
  }
});

