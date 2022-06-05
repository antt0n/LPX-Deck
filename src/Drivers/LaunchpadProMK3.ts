import { TextEncoder } from 'util';
import Driver from './driver';

/**
 * Driver for Novation Launchpad Pro MK3
 */
export default class LaunchpadMK2 extends Driver {

  constructor() {
    super()
  }
  
  public DeviceName = "Launchpad Pro MK3";
  public MidiIn = "LPProMK3 MIDI"; // Not tested
  public MidiOut = "LPProMK3 MIDI"; // Not tested
  public Dictionary = {
    sysEx: {
      header: [240, 0, 32, 41, 2, 14],
      footer: [247]
    },
    commands: {
      selectLayout: 34,
      textScrolling: 20,
      // Not implemented yet
      setLed: 10,
      setLedRgb: 11,
      setLedCol: 12,
      setLedRow: 13,
      setAllLed: 14,
      flashLed: 35,
      pulseLed: 40,
      // Should be added ?
      faderSetup: 43
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
    fader = 1,
    chord = 2,
    custom = 3,
    noteDrum = 4,
    scaleSetting = 5,
    sequencerSettings = 6,
    sequencerSteps = 7,
    sequencerVelocity = 8,
    sequencerPatternSettings = 9,
    sequencerProbability = 10,
    sequencerMutation = 11,
    sequencerMicroStep = 12,
    sequencerProjects = 13,
    sequencerPatterns = 14,
    sequencerTempo = 15,
    sequencerSwing = 16,
    programmer = 17,
    settingsMenu = 18,
    customSettings = 19
  }

  export const PizzaSize = {
    small: { value: 'small', key: 0, size: 25 },
    medium: { value: 'medium', key: 1, size: 35 },
    large: { value: 'large', key: 2, size: 50 },
  } as const
  export type PizzaSize = keyof typeof PizzaSize
  }
}