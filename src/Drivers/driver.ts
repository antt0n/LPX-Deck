import Options from '../config'
import LayoutType from '../Models/Config/layoutEnum';
import { TextEncoder } from 'util';

/**
 * Root class for drivers
 */
export default class Driver {

  constructor() {}

  /**
   * Name of the device
   */
  public DeviceName!:string;
  /**
   * Midi In port name
   */
  public MidiIn!:string;
  /**
   * Midi Out port name
   */
  public MidiOut!:string;
  /**
   * Dictionary between Node usable commands and Device features
   */
  public Dictionary!: {
    command: {
      /**
         * SysEx Header
         */
      sysexHeader: Array<number>,
      /**
         * SysEx Footer
         */
      sysexFooter: number,
      /**
        * Select layout command
        */
      selectLayout: number,
      /**
        * Led SysEx command
        */
      ledLightning: number,
      /**
        * Text scolling command
        */
      textScrolling: number,
      /**
         * Brightness level command
         */
      brightness: number,
      /**
         * Programmer or Live mode command
         */
      programmer: number,
      /**
        * Channels for LightningCustomMode
        */
      LightningCustomMode: {
        static: number,
        flashing: number,
        pulsing: number
      }
    },
    input: {
      onNote: number
    }
  }

  private queryBuilder(data: Array<number>) {
    return Array<number>().concat(this.Dictionary.command.sysexHeader, data, [this.Dictionary.command.sysexFooter]);
  }

  /**
   * DriverQuery: feat: setLayout
   * @param {number} layout Layout number
   * @returns {Array<number>}
   */
     public setLayout(layout: LayoutType) {
      return this.queryBuilder([this.Dictionary.command.selectLayout, layout])
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
      return this.queryBuilder([this.Dictionary.command.textScrolling, +shouldLoop, speed, 0, color].concat( Array.from(new TextEncoder().encode(text))) )
    }
}