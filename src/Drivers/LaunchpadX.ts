import Driver from './driver';

/**
 * Driver for Novation Launchpad X
 */
export default class LaunchpadX extends Driver {
  constructor() {
    super();

    this.DeviceName = 'Launchpad X';
    this.MidiIn = 'LPX MIDI';
    this.MidiOut = 'LPX MIDI';
    this.Dictionary = {
      command: {
        sysexHeader: [240, 0, 32, 41, 2, 12],
        sysexFooter: 247,
        selectLayout: 0,
        ledLightning: 3,
        textScrolling: 7,
        brightness: 8,
        programmer: 14,
        LightningCustomMode: {
          static: 1,
          flashing: 2,
          pulsing: 3,
        },
      },
      input: {
        onNote: 144,
      },
    };
  }
}
