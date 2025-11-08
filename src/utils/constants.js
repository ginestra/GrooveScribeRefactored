// Constants used throughout the application

export const MAX_MEASURES = 50;
export const DEFAULT_TEMPO = 80;
export const UNDO_STACK_MAX_SIZE = 40;
export const NUMBER_OF_TOMS = 4;

// ABC Notation constants
export const ABC_STICK_R = '"R"x';
export const ABC_STICK_L = '"L"x';
export const ABC_STICK_BOTH = '"R/L"x';
export const ABC_STICK_COUNT = '"count"x';
export const ABC_STICK_OFF = '""x';

export const ABC_HH_Ride = "^A'";
export const ABC_HH_Ride_Bell = "^B'";
export const ABC_HH_Cow_Bell = "^D'";
export const ABC_HH_Crash = "^c'";
export const ABC_HH_Stacker = "^d'";
export const ABC_HH_Metronome_Normal = "^e'";
export const ABC_HH_Metronome_Accent = "^f'";
export const ABC_HH_Open = "!open!^g";
export const ABC_HH_Close = "!plus!^g";
export const ABC_HH_Accent = "!accent!^g";
export const ABC_HH_Normal = "^g";

export const ABC_SN_Ghost = "!(.!!).!c";
export const ABC_SN_Accent = "!accent!c";
export const ABC_SN_Normal = "c";
export const ABC_SN_XStick = "^c";
export const ABC_SN_Buzz = "!///!c";
export const ABC_SN_Flam = "!accent!{/c}c";
export const ABC_SN_Drag = "{/cc}c";

export const ABC_KI_SandK = "[F^d,]"; // kick & splash
export const ABC_KI_Splash = "^d,"; // splash only
export const ABC_KI_Normal = "F";

export const ABC_T1_Normal = "e";
export const ABC_T2_Normal = "d";
export const ABC_T3_Normal = "B";
export const ABC_T4_Normal = "A";

export const ABC_OFF = false;

// MIDI Velocity constants
export const OUR_MIDI_VELOCITY_NORMAL = 85;
export const OUR_MIDI_VELOCITY_ACCENT = 120;
export const OUR_MIDI_VELOCITY_GHOST = 50;

// MIDI Note constants
export const OUR_MIDI_METRONOME_1 = 76;
export const OUR_MIDI_METRONOME_NORMAL = 77;
export const OUR_MIDI_HIHAT_NORMAL = 42;
export const OUR_MIDI_HIHAT_OPEN = 46;
export const OUR_MIDI_HIHAT_ACCENT = 108;
export const OUR_MIDI_HIHAT_CRASH = 49;
export const OUR_MIDI_HIHAT_STACKER = 52;
export const OUR_MIDI_HIHAT_METRONOME_NORMAL = 77;
export const OUR_MIDI_HIHAT_METRONOME_ACCENT = 76;
export const OUR_MIDI_HIHAT_RIDE = 51;
export const OUR_MIDI_HIHAT_RIDE_BELL = 53;
export const OUR_MIDI_HIHAT_COW_BELL = 105;
export const OUR_MIDI_HIHAT_FOOT = 44;
export const OUR_MIDI_SNARE_NORMAL = 38;
export const OUR_MIDI_SNARE_ACCENT = 22;
export const OUR_MIDI_SNARE_GHOST = 21;
export const OUR_MIDI_SNARE_XSTICK = 37;
export const OUR_MIDI_SNARE_BUZZ = 104;
export const OUR_MIDI_SNARE_FLAM = 107;
export const OUR_MIDI_SNARE_DRAG = 103;
export const OUR_MIDI_KICK_NORMAL = 35;
export const OUR_MIDI_TOM1_NORMAL = 48;
export const OUR_MIDI_TOM2_NORMAL = 47;
export const OUR_MIDI_TOM3_NORMAL = 45;
export const OUR_MIDI_TOM4_NORMAL = 43;

// UI Color constants
export const NOTE_ON_COLOR_HEX = "#000000";
export const NOTE_ON_COLOR_RGB = 'rgb(0, 0, 0)';
export const NOTE_OFF_COLOR_HEX = "#FFF";
export const NOTE_OFF_COLOR_RGB = 'rgb(255, 255, 255)';
export const NOTE_BORDER_COLOR_HEX = "#999";
export const HIHAT_NOTE_OFF_COLOR_HEX = "#CCC";
export const HIHAT_NOTE_OFF_COLOR_RGB = 'rgb(204, 204, 204)';
export const NOTE_HIDDEN_COLOR_RGB = "transparent";
export const STICKING_RIGHT_ON_COLOR_RGB = "rgb(36, 132, 192)";
export const STICKING_LEFT_ON_COLOR_RGB = "rgb(57, 57, 57)";
export const STICKING_BOTH_ON_COLOR_RGB = "rgb(57, 57, 57)";
export const STICKING_COUNT_ON_COLOR_RGB = "rgb(57, 57, 57)";
export const STICKING_RIGHT_OFF_COLOR_RGB = "rgb(204, 204, 204)";
export const STICKING_LEFT_OFF_COLOR_RGB = "rgb(204, 204, 204)";
export const SNARE_ACCENT_ON_COLOR_HEX = "#FFF";
export const SNARE_ACCENT_ON_COLOR_RGB = "rgb(255, 255, 255)";

