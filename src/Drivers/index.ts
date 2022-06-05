import Driver from './driver';
import LaunchpadX from './LaunchpadX';
import LaunchpadMiniMK3 from './LaunchpadMiniMK3';

const availableDrivers: { [key: string]: any } = {
  LaunchpadX: new LaunchpadX(),
  LaunchpadMiniMK3: new LaunchpadMiniMK3()
};

export default availableDrivers;