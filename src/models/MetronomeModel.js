/**
 * MetronomeModel - Manages metronome state and tempo
 */

export class MetronomeModel {
  constructor() {
    this.frequency = 0; // 0 = off, 4 = 4ths, 8 = 8ths, 16 = 16ths
    this.solo = false; // Mute groove when metronome is playing
    this.autoSpeedUp = false;
    this.autoSpeedUpAmount = 5; // BPM increase amount
    this.autoSpeedUpInterval = 2; // Minutes
    this.countIn = false; // One measure count-in before playback
    this.offsetClick = false; // Accent e, &, or a instead of 1
    this.offsetClickStart = "1"; // "1", "E", "AND", "A", "ROTATE"
    this.offsetClickStartRotation = 0; // Rotation counter for ROTATE mode
  }

  setFrequency(frequency) {
    this.frequency = frequency;
  }

  getFrequency() {
    return this.frequency;
  }

  isOn() {
    return this.frequency > 0;
  }

  setSolo(solo) {
    this.solo = solo;
  }

  getSolo() {
    return this.solo;
  }

  setAutoSpeedUp(enabled, amount = 5, interval = 2) {
    this.autoSpeedUp = enabled;
    this.autoSpeedUpAmount = amount;
    this.autoSpeedUpInterval = interval;
  }

  setCountIn(enabled) {
    this.countIn = enabled;
  }

  setOffsetClick(enabled, start = "1") {
    this.offsetClick = enabled;
    this.offsetClickStart = start;
    if (start === "ROTATE") {
      this.offsetClickStartRotation = 0;
    }
  }

  getOffsetClickStart(isTriplets = false) {
    if (this.offsetClickStart === "ROTATE") {
      // Constrain the rotation
      if (isTriplets && this.offsetClickStartRotation > 2) {
        this.offsetClickStartRotation = 0;
      } else if (this.offsetClickStartRotation > 3) {
        this.offsetClickStartRotation = 0;
      }

      switch (this.offsetClickStartRotation) {
        case 0:
          return '1';
        case 1:
          return isTriplets ? 'TI' : 'E';
        case 2:
          return isTriplets ? 'TA' : 'AND';
        case 3:
          return 'A';
        default:
          return '1';
      }
    }
    return this.offsetClickStart;
  }

  advanceOffsetClickRotation() {
    if (this.offsetClickStart === "ROTATE") {
      this.offsetClickStartRotation++;
      return true;
    }
    return false;
  }

  resetOffsetClickRotation() {
    this.offsetClickStartRotation = 0;
  }
}

