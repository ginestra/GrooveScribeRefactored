/**
 * URLStateService - Handles URL encoding/decoding for groove sharing
 */

import { GrooveModel } from '../models/GrooveModel.js';

export class URLStateService {
  /**
   * Get query variable from URL string
   * @param {string} variable - Variable name
   * @param {string} defaultValue - Default value
   * @param {string} urlString - URL string to parse
   * @returns {string}
   */
  getQueryVariableFromString(variable, defaultValue, urlString) {
    const query = urlString.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0].toLowerCase() === variable.toLowerCase()) {
        return pair[1];
      }
    }
    return defaultValue;
  }

  /**
   * Get query variable from current page URL
   * @param {string} variable - Variable name
   * @param {string} defaultValue - Default value
   * @returns {string}
   */
  getQueryVariableFromURL(variable, defaultValue) {
    return this.getQueryVariableFromString(variable, defaultValue, window.location.search);
  }

  /**
   * Encode groove data to URL string
   * @param {GrooveModel} grooveData - Groove data to encode
   * @param {string} urlDestination - Destination type ('display', 'fullGrooveScribe', or null)
   * @returns {string} Full URL with encoded groove data
   */
  getUrlStringFromGrooveData(grooveData, urlDestination = null) {
    let fullURL = window.location.protocol + '//' + window.location.host + window.location.pathname;

    if (urlDestination === 'display') {
      if (fullURL.includes('index.html')) {
        fullURL = fullURL.replace('index.html', 'GrooveEmbed.html');
      } else if (fullURL.includes('/gscribe')) {
        fullURL = fullURL.replace('/gscribe', '/groove/GrooveEmbed.html');
      } else {
        fullURL += 'GrooveEmbed.html';
      }
    } else if (urlDestination === 'fullGrooveScribe') {
      fullURL = 'https://ginestra.github.io/GrooveScribe/';
    }

    fullURL += '?';

    if (grooveData.debugMode) {
      fullURL += 'Debug=1&';
    }

    if (grooveData.viewMode) {
      fullURL += 'Mode=view&';
    }

    if (grooveData.grooveDBAuthoring) {
      fullURL += 'GDB_Author=1&';
    }

    fullURL += 'TimeSig=' + grooveData.numBeats + '/' + grooveData.noteValue;
    fullURL += '&Div=' + grooveData.timeDivision;

    if (grooveData.title !== '') {
      fullURL += '&Title=' + encodeURIComponent(grooveData.title);
    }

    if (grooveData.author !== '') {
      fullURL += '&Author=' + encodeURIComponent(grooveData.author);
    }

    if (grooveData.comments !== '') {
      fullURL += '&Comments=' + encodeURIComponent(grooveData.comments);
    }

    fullURL += '&Tempo=' + grooveData.tempo;

    if (grooveData.swingPercent > 0) {
      fullURL += '&Swing=' + grooveData.swingPercent;
    }

    fullURL += '&Measures=' + grooveData.numberOfMeasures;

    if (grooveData.metronomeFrequency !== 0) {
      fullURL += '&MetronomeFreq=' + grooveData.metronomeFrequency;
    }

    // Encode note arrays
    const totalNotes = grooveData.notesPerMeasure * grooveData.numberOfMeasures;
    
    // This will need to be implemented with actual note array encoding
    // For now, placeholder structure
    fullURL += '&H=' + this.encodeNoteArray(grooveData.hh_array, totalNotes);
    fullURL += '&S=' + this.encodeNoteArray(grooveData.snare_array, totalNotes);
    fullURL += '&K=' + this.encodeNoteArray(grooveData.kick_array, totalNotes);
    
    if (grooveData.showStickings) {
      fullURL += '&Stickings=' + this.encodeNoteArray(grooveData.sticking_array, totalNotes);
    }

    if (grooveData.showToms) {
      fullURL += '&T1=' + this.encodeNoteArray(grooveData.toms_array[0], totalNotes);
      fullURL += '&T2=' + this.encodeNoteArray(grooveData.toms_array[1], totalNotes);
      fullURL += '&T4=' + this.encodeNoteArray(grooveData.toms_array[3], totalNotes);
    }

    return fullURL;
  }

  /**
   * Encode note array to URL string format
   * @param {Array} noteArray - Array of note states
   * @param {number} totalNotes - Total number of notes to encode
   * @returns {string} Encoded note string
   */
  encodeNoteArray(noteArray, totalNotes) {
    // This will need full implementation based on original encoding logic
    // Placeholder for now
    let encoded = '';
    for (let i = 0; i < Math.min(totalNotes, noteArray.length); i++) {
      const note = noteArray[i];
      if (note === false || note === 'off') {
        encoded += '-';
      } else {
        // Encode based on note type
        encoded += this.encodeNoteState(note);
      }
    }
    return encodeURIComponent(encoded);
  }

  /**
   * Encode individual note state to character
   * @param {string} noteState - Note state
   * @returns {string} Encoded character
   */
  encodeNoteState(noteState) {
    // This will map note states to URL characters
    // Implementation needed based on original code
    return 'x'; // placeholder
  }

  /**
   * Decode URL string to groove data
   * @param {string} urlString - URL string to decode
   * @returns {GrooveModel} Decoded groove data
   */
  getGrooveDataFromUrlString(urlString) {
    const grooveData = new GrooveModel();

    // Parse time signature
    const timeSig = this.getQueryVariableFromString('TimeSig', '4/4', urlString);
    const [numBeats, noteValue] = timeSig.split('/').map(Number);
    grooveData.setTimeSignature(numBeats || 4, noteValue || 4);

    // Parse division
    const division = parseInt(this.getQueryVariableFromString('Div', '16', urlString), 10);
    grooveData.setDivision(division);

    // Parse measures
    const measures = parseInt(this.getQueryVariableFromString('Measures', '1', urlString), 10);
    grooveData.setNumberOfMeasures(measures);

    // Parse metadata
    grooveData.title = decodeURIComponent(this.getQueryVariableFromString('Title', '', urlString));
    grooveData.author = decodeURIComponent(this.getQueryVariableFromString('Author', '', urlString));
    grooveData.comments = decodeURIComponent(this.getQueryVariableFromString('Comments', '', urlString));

    // Parse playback settings
    grooveData.tempo = parseInt(this.getQueryVariableFromString('Tempo', '80', urlString), 10);
    grooveData.swingPercent = parseInt(this.getQueryVariableFromString('Swing', '0', urlString), 10);
    grooveData.metronomeFrequency = parseInt(this.getQueryVariableFromString('MetronomeFreq', '0', urlString), 10);

    // Decode note arrays
    const hhString = decodeURIComponent(this.getQueryVariableFromString('H', '', urlString));
    const snareString = decodeURIComponent(this.getQueryVariableFromString('S', '', urlString));
    const kickString = decodeURIComponent(this.getQueryVariableFromString('K', '', urlString));
    const stickingsString = decodeURIComponent(this.getQueryVariableFromString('Stickings', '', urlString));
    const tom1String = decodeURIComponent(this.getQueryVariableFromString('T1', '', urlString));
    const tom2String = decodeURIComponent(this.getQueryVariableFromString('T2', '', urlString));
    const tom4String = decodeURIComponent(this.getQueryVariableFromString('T4', '', urlString));

    // Decode note strings to arrays
    grooveData.hh_array = this.decodeNoteString(hhString, grooveData.notesPerMeasure * grooveData.numberOfMeasures);
    grooveData.snare_array = this.decodeNoteString(snareString, grooveData.notesPerMeasure * grooveData.numberOfMeasures);
    grooveData.kick_array = this.decodeNoteString(kickString, grooveData.notesPerMeasure * grooveData.numberOfMeasures);
    
    if (stickingsString) {
      grooveData.sticking_array = this.decodeNoteString(stickingsString, grooveData.notesPerMeasure * grooveData.numberOfMeasures);
      grooveData.showStickings = true;
    }

    if (tom1String || tom2String || tom4String) {
      grooveData.toms_array[0] = this.decodeNoteString(tom1String, grooveData.notesPerMeasure * grooveData.numberOfMeasures);
      grooveData.toms_array[1] = this.decodeNoteString(tom2String, grooveData.notesPerMeasure * grooveData.numberOfMeasures);
      grooveData.toms_array[3] = this.decodeNoteString(tom4String, grooveData.notesPerMeasure * grooveData.numberOfMeasures);
      grooveData.showToms = true;
    }

    return grooveData;
  }

  /**
   * Decode note string to array
   * @param {string} noteString - Encoded note string
   * @param {number} totalNotes - Total number of notes expected
   * @returns {Array} Decoded note array
   */
  decodeNoteString(noteString, totalNotes) {
    // Remove measure separators
    const cleaned = noteString.replace(/[:|]/g, '');
    const array = new Array(totalNotes).fill(false);
    
    for (let i = 0; i < Math.min(cleaned.length, totalNotes); i++) {
      const char = cleaned[i];
      if (char !== '-') {
        array[i] = this.decodeNoteChar(char);
      }
    }
    
    return array;
  }

  /**
   * Decode single character to note state
   * @param {string} char - Encoded character
   * @returns {string|boolean} Note state
   */
  decodeNoteChar(char) {
    // This will map URL characters to note states
    // Implementation needed based on original code
    return char; // placeholder
  }
}

