import Driver from './driver';
// Drivers
import LaunchpadX from './LaunchpadX';
import LaunchpadMiniMK3 from './LaunchpadMiniMK3';
import LaunchpadMK2 from './LaunchpadMK2';

const availableDrivers: { [key: string]: any } = {
  LaunchpadX: new LaunchpadX(),
  LaunchpadMiniMK3: new LaunchpadMiniMK3(),
  LaunchpadMK2: new LaunchpadMK2(),
};

export default availableDrivers;
