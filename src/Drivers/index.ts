import Driver from './driver';
// Drivers
import LaunchpadMK1 from './MK1/Launchpad';
import LaunchpadSMK1 from './MK1/LaunchpadS';

import LaunchpadMK2 from './MK2/Launchpad';
import LaunchpadProMK2 from './MK2/LaunchpadPro';

import LaunchpadXMK3 from './MK3/LaunchpadX';
import LaunchpadMiniMK3 from './MK3/LaunchpadMini';
import LaunchpadProMK3 from './MK3/LaunchpadPro';

class DriverManager {
  // MK1
  public static readonly LaunchpadMK1 = new LaunchpadMK1();
  public static readonly LaunchpadSMK1 = new LaunchpadSMK1();
  // MK2
  public static readonly LaunchpadMK2 = new LaunchpadMK2(); // edit name
  public static readonly LaunchpadProMK2 = new LaunchpadProMK2();
  // MK3
  public static readonly LaunchpadX = new LaunchpadXMK3(); // edit name
  public static readonly LaunchpadMiniMK3 = new LaunchpadMiniMK3(); // edit name
  public static readonly LaunchpadProMK3 = new LaunchpadProMK3();

  public static getDriver(driverName: StringDrivers) {
    if (!(driverName in DriverManager)) throw new Error('DriverManager: driver not found')
    switch (driverName) {
      case "LaunchpadX": return this.LaunchpadX
      case "LaunchpadMK2": return this.LaunchpadMK2
      case "LaunchpadMiniMK3": return this.LaunchpadMiniMK3
    } 
    throw new Error('DriverManager: internal exception')
  }  
}
export type Drivers = ReturnType<typeof DriverManager.getDriver>
export type StringDrivers = "LaunchpadX" | "LaunchpadMK2" | "LaunchpadMiniMK3";
export default DriverManager;
