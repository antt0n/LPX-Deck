import Driver from './driver';

/**
 * Driver for Novation Launchpad Pro MK3
 * 
 * WORK IN PROGRESS
 */
export default class LaunchpadMiniMK3 extends Driver {
  constructor() {
    super();

    this.DeviceName = 'Launchpad Mini MK3';
    this.MidiIn = '';
    this.MidiOut = '';
    this.Dictionary = {
      command: {
        sysexHeader: [240, 0, 32, 41, 2, 13],
        sysexFooter: 247,
        selectLayout: 0,
        ledLightning: 3,
        textScrolling: 7,
        ledBrightness: 8,
        programmer: 14,
        LightningCustomMode: {
          static: 1, 
          flashing: 2,
          pulsing: 3,
        },
        daw: 16,
        dawClear: 18,
        sessionColor: 20,
        ledSleep: 9
      },
      input: {
        onNote: 144,
      },
    };
  }
}
