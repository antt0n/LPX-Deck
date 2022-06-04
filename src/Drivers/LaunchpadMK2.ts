import Driver from './driver';

/**
 * Driver for Novation Launchpad MK2
 * 
 * WORK IN PROGRESS
 */
export default class LaunchpadMiniMK2 extends Driver {
  constructor() {
    super();

    this.DeviceName = 'Launchpad MK2';
    this.MidiIn = '';
    this.MidiOut = '';
    this.Dictionary = {
      command: {
        sysexHeader: [240, 0, 32, 41, 2, 24], //
        sysexFooter: 247, //
        selectLayout: 34, //
        ledLightning: 3, 
        textScrolling: 14, //
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
