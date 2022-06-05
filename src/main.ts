import Driver from './Drivers/driver';
import availableDrivers from './Drivers';
import MidiService from './Service/Midi';

class LaunchpadCore {
  static readonly drivers = availableDrivers;

  private static _devicesInstance: { [key: string]: MidiService };
  readonly _instance: MidiService;
  readonly _driver: any;

  private callbacks: { [e: string]: any[] } = {
    onMidiIn: [],
    onConnected: [],
    onDisabled: [],
  };

  constructor(driverName: string) {
    if (!(driverName in LaunchpadCore.drivers)) throw new Error('LaunchpadCore: driver not found.');

    this._driver = LaunchpadCore.drivers[driverName];
    this._instance = new MidiService(this._driver.MidiIn, this._driver.MidiOut);

    this.onEnabled();

    process.on('SIGINT', () => this.onDisabled());
    process.on('EXIT', () => this.onDisabled());
  }

  private async onEnabled() {
    await this._instance.in.connect((data: any) => {
      this.handleEvent('onMidiIn', data);
    });
    await this.handleEvent('onConnected', this._instance, this._driver);
  }

  private async onDisabled() {
    await this.handleEvent('onDisabled', this._instance, this._driver);
    this._instance.closeAll();
  }

  /**
   * Events
   */
  private async handleEvent(event: string, ...args: any[]) {
    for (const f of this.callbacks[event]) f(...args);
  }

  on(event: 'onMidiIn', callback: (data: any) => void): void;
  on(event: 'onConnected', callback: (instance: MidiService, driver: any) => void): void;
  on(event: 'onDisabled', callback: (instance: MidiService, driver: any) => void): void;

  on(event: string, callback: any) {
    if (!this.callbacks[event]) throw new Error(`Unknown event name: '${event}'`);
    this.callbacks[event].push(callback);
  }
}
export default LaunchpadCore;

const App = new LaunchpadCore("LaunchpadX");
App.on("onConnected", (instance, driver) => {
  instance.out.send(driver.textScrolling(65, "ENFIN"))
})