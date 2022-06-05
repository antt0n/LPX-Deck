import { TextEncoder } from 'util';

/**
 * Root class for drivers
 */
class Driver {
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
    sysEx: {
      /**
       * SysEx Header
       */
      header: Array<number>;
      /**
       * SysEx Footer
       */
      footer: Array<number>;
    };
    commands: { [key: string]: number }
  };

  protected queryBuilder(data: Array<number>) {
    return Array<number>().concat(this.Dictionary.sysEx.header, data, this.Dictionary.sysEx.footer);
  }

  protected featureCheck(feat: any) {
    return feat in this.Dictionary.commands
  }

}
export default Driver;
