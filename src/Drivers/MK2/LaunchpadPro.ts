import { TextEncoder } from 'util';
import Driver from '../driver';

/**
 * Driver for Novation Launchpad Pro MK2
 */
export default class LaunchpadProMK2 extends Driver {
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
