import { TextEncoder } from 'util';
import Driver from './driver';

/**
 * Driver for Novation Launchpad MK2
 */
export default class LaunchpadMK2 extends Driver {

  constructor() {
    super()
  }
  
  public DeviceName = "Launchpad MK2";
  public MidiIn = "LPMK2 MIDI"; // Not tested
  public MidiOut = "LPMK2 MIDI"; // Not tested
  public Dictionary = {
    sysEx: {
      header: [240, 0, 32, 41, 2, 24],
      footer: [247]
    },
    commands: {
      selectLayout: 34,
      textScrolling: 20
    }
  }
  public LightningCustomMode!: {
    static: 1,
    flashing: 2,
    pulsing: 3,
  }
  
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
   * @returns {Array<number>}
   */
  public textScrolling(color: number, text: string, shouldLoop = false) {
    return this.queryBuilder(
      [this.Dictionary.commands.textScrolling, color, +shouldLoop].concat(
        Array.from(new TextEncoder().encode(text)),
      ),
    );
  }

}

module Type {
  export enum layoutType {
    session = 0,
    user1 = 1,
    user2 = 2,
    fader = 4,
    pan = 5
  }
}