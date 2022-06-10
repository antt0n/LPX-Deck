import { TextEncoder } from 'util';
import Driver from '../driver';

/**
 * Driver for Novation Launchpad MK1
 */
export default class LaunchpadMK1 extends Driver {
  constructor() {
    super();
  }

  public DeviceName = 'Default';
  public MidiIn = ''; // Not tested
  public MidiOut = ''; // Not tested
  public Dictionary = {
    sysEx: {
      header: [],
      footer: [],
    },
    commands: {
        //
    },
  };

  /*
   * Public methods
   */

  //
}

module Type {
  //
}
