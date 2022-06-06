import { TextEncoder } from 'util';
import Driver from './driver';

/**
 * Driver for Novation Launchpad X
 */
export default class LaunchpadX extends Driver {
  constructor() {
    super();
  }

  public DeviceName = 'Launchpad X';
  public MidiIn = 'LPX MIDI';
  public MidiOut = 'LPX MIDI';
  public Dictionary = {
    sysEx: {
      header: [240, 0, 32, 41, 2, 12],
      footer: [247],
    },
    commands: {
      selectLayout: 0,
      ledLightning: 3,
      textScrolling: 7,
      ledBrightness: 8,
      programmer: 14,
      daw: 16,
      dawClear: 18,
      sessionColor: 20,
      ledSleep: 9,
    },
  };
  public LightningCustomMode!: {
    static: 1;
    flashing: 2;
    pulsing: 3;
  };

  /*
   * Public methods
   */

  /**
   * DriverQuery: feat: setLayout
   * @param {number} layout Layout number
   * @returns {Array<number>}
   */
  public setLayout(layout: Type.layoutType) {
    return this.queryBuilder([this.Dictionary.commands.selectLayout, layout]);
  }

  /**
   * DriverQuery: feat: textScrolling
   * @param {number} color Index color
   * @param {string} text Text to display
   * @param {boolean} [shouldLoop=false] Show loop the message
   * @param {number} [speed=7] Speed
   * @returns {Array<number>}
   */
  public textScrolling(color: number, text: string, shouldLoop = false, speed = 7) {
    return this.queryBuilder(
      [this.Dictionary.commands.textScrolling, +shouldLoop, speed, 0, color].concat(
        Array.from(new TextEncoder().encode(text)),
      ),
    );
  }

  /**
   * DriverQuery: feat: programmerToogle
   * @param {boolean} bool Enable or disable programmer mode (switch from Live)
   * @returns {Array<number>}
   */
  public programmerToggle(bool: boolean) {
    return this.queryBuilder([this.Dictionary.commands.programmer, +bool]);
  }

  /**
   * DriverQuery: feat: dawToogle
   * @param {boolean} bool Enable or disable DAW mode (switch from Live)
   * @returns {Array<number>}
   */
  public dawToogle(bool: boolean) {
    return this.queryBuilder([this.Dictionary.commands.daw, +bool]);
  }

  /**
   * DriverQuery: feat: dawClear
   * @param {boolean} session Clear session layout (true by default)
   * @param {boolean} drumrack Clear drumrack layout (true by default)
   * @param {boolean} controlchange Clear controlchange layout (true by default)
   * @returns {Array<number>}
   */
  public dawClear(session: boolean = true, drumrack: boolean = true, controlchange: boolean = true) {
    return this.queryBuilder([this.Dictionary.commands.dawClear, +session, +drumrack, +controlchange]);
  }

  /**
   * DriverQuery: feat: ledLightning
   * @param {Array<number>} colors Array with colors to change (refer to Programmer Manual of your Launchpad)
   * @returns {Array<number>}
   */
  public ledLightning(colors: Array<number>) {
    return this.queryBuilder(Array<number>().concat([this.Dictionary.commands.ledLightning], colors));
  }

  /**
   * DriverQuery: feat: ledBrightness
   * @param {number} brightness Brightness for the Launchpad (between 0 and 127)
   * @returns {Array<number>}
   */
  public ledBrightness(brightness: number) {
    return this.queryBuilder([this.Dictionary.commands.ledBrightness, brightness]);
  }

  /**
   * DriverQuery: feat: ledBrightness
   * @param {boolean} sleep Disable light of all pads (true by default)
   * @returns {Array<number>}
   */
  public ledSleep(sleep: boolean = false) {
    return this.queryBuilder([this.Dictionary.commands.ledSleep, +!sleep]);
  }
}

module Type {
  export enum layoutType {
    session = 0,
    note = 1,
    custom1 = 4,
    custom2 = 5,
    custom3 = 6,
    custom4 = 7,
    dawFaders = 13,
    programmer = 127,
  }
}
