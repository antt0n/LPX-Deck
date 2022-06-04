import Driver from './driver';
import LaunchpadX from './LaunchpadX';

const availableDrivers: { [key: string]: Driver } = {
  LaunchpadX: new LaunchpadX(),
};

export default availableDrivers;
