import LayoutType from '../Models/layoutType';
import { TextEncoder } from 'util';

/**
 * Root class for drivers
 */
export default class Driver {
  /**
   * Default constructor
   */
  constructor() {
    this.DeviceName = 'default';
    this.MidiIn = '';
    this.MidiOut = '';
    this.Dictionary = {
      command: {
        sysexHeader: [-1],
        sysexFooter: -1, 
        selectLayout: -1,
        ledLightning: -1, 
        textScrolling: -1,
        ledBrightness: -1,
        programmer: -1,
        LightningCustomMode: {
          static: -1,
          flashing: -1,
          pulsing: -1,
        },
        daw: -1,
        dawClear: -1,
        sessionColor: -1,
        ledSleep: -1
      },
      input: {
        onNote: 144,
      }
    }
  } 
  /**
   * Name of the device
   */
  public DeviceName!: string;
  /**
   * Midi In port name
   */
  public MidiIn!: string;
  /**
   * Midi Out port name
   */
  public MidiOut!: string;
  /**
   * Dictionary between Node usable commands and Device features
   */
  public Dictionary!: {
    command: {
      /**
       * SysEx Header
       */
      sysexHeader: Array<number>;
      /**
       * SysEx Footer
       */
      sysexFooter: number;
      /**
       * Select layout command
       */
      selectLayout: number;
      /**
       * Led SysEx command
       */
      ledLightning: number;
      /**
       * Text scolling command
       */
      textScrolling: number;
      /**
       * Brightness level command
       */
      ledBrightness: number;
      /**
       * Programmer or Live mode command
       */
      programmer: number;
      /**
       * Channels for LightningCustomMode
       */
      LightningCustomMode: {
        static: number;
        flashing: number;
        pulsing: number;
      };
      /**
       * DAW Mode
       */
      daw: number;
      /**
       * Clear DAW
       */
      dawClear: number;
      /**
       * Session button color
       */
      sessionColor: number;
      /**
       * LED Sleep
       */
      ledSleep: number;
    };
    input: {
      onNote: number;
    };
  };

  private queryBuilder(data: Array<number>) {
    return Array<number>().concat(this.Dictionary.command.sysexHeader, data, [this.Dictionary.command.sysexFooter]);
  }

  private featureCheck(feat: any) {
    return feat in this.Dictionary.command
  }

  /*
   * Public methods
   */

  /**
   * DriverQuery: feat: setLayout
   * @param {number} layout Layout number
   * @returns {Array<number>}
   */
  public setLayout(layout: LayoutType) {
    return this.queryBuilder([this.Dictionary.command.selectLayout, layout]);
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
      [this.Dictionary.command.textScrolling, +shouldLoop, speed, 0, color].concat(
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
    return this.queryBuilder([this.Dictionary.command.programmer, +bool])
  }

  /**
   * DriverQuery: feat: dawToogle
   * @param {boolean} bool Enable or disable DAW mode (switch from Live)
   * @returns {Array<number>}
   */
  public dawToogle(bool: boolean) {
    return this.queryBuilder([this.Dictionary.command.daw, +bool])
  }

  /**
   * DriverQuery: feat: dawClear
   * @param {boolean} session Clear session layout (true by default)
   * @param {boolean} drumrack Clear drumrack layout (true by default)
   * @param {boolean} controlchange Clear controlchange layout (true by default)
   * @returns {Array<number>}
   */
  public dawClear(session: boolean = true, drumrack: boolean = true, controlchange: boolean = true) {
    return this.queryBuilder([this.Dictionary.command.dawClear, +session, +drumrack, +controlchange])
  }

  /**
   * DriverQuery: feat: ledLightning
   * @param {Array<number>} colors Array with colors to change (refer to Programmer Manual of your Launchpad)
   * @returns {Array<number>}
   */
  public ledLightning(colors: Array<number>) {
    return this.queryBuilder(Array<number>().concat([this.Dictionary.command.ledLightning], colors))
  }

  /**
   * DriverQuery: feat: ledBrightness
   * @param {number} brightness Brightness for the Launchpad (between 0 and 127)
   * @returns {Array<number>}
   */
  public ledBrightness(brightness: number) {
    return this.queryBuilder([this.Dictionary.command.ledBrightness, brightness])
  }

  /**
   * DriverQuery: feat: ledBrightness
   * @param {boolean} sleep Disable light of all pads (true by default)
   * @returns {Array<number>}
   */
  public ledSleep(sleep: boolean = false) {
    return this.queryBuilder([this.Dictionary.command.ledSleep, +!sleep])
  }
}
