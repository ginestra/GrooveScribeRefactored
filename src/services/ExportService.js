/**
 * ExportService - Handles file export (SVG, PNG, MIDI, ABC)
 */

export class ExportService {
  /**
   * Download SVG file
   * @param {string} svgContent - SVG content as string
   * @param {string} filename - Filename for download
   */
  downloadSVG(svgContent, filename = 'groove.svg') {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Download PNG file from SVG
   * @param {string} svgContent - SVG content as string
   * @param {string} filename - Filename for download
   * @param {number} width - Image width
   * @param {number} height - Image height
   */
  async downloadPNG(svgContent, filename = 'groove.png', width = 1000, height = 1000) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
          URL.revokeObjectURL(url);
          resolve();
        }, 'image/png');
      };

      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Download MIDI file
   * @param {Blob} midiBlob - MIDI file blob
   * @param {string} filename - Filename for download
   */
  downloadMIDI(midiBlob, filename = 'groove.mid') {
    const url = URL.createObjectURL(midiBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Download ABC notation file
   * @param {string} abcContent - ABC notation content
   * @param {string} filename - Filename for download
   */
  downloadABC(abcContent, filename = 'groove.abc') {
    const blob = new Blob([abcContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} Success status
   */
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        return success;
      }
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  }
}

