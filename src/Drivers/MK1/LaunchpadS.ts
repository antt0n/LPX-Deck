import { TextEncoder } from 'util';
import Driver from '../driver';

/**
 * Driver for Novation Launchpad S MK1
 */
export default class LaunchpadSMK1 extends Driver {
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
