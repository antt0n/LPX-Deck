process.env["NODE_CONFIG_DIR"] = __dirname + "/configs/";
import Config from "config"
import Options from "./config";
import LayoutType from "./Models/Config/layoutEnum"
import NoteHandler from './Handler/NoteHandler'
import Driver from "./Drivers/driver";
import availableDrivers from "./Drivers";
import MidiService from "./Service/Midi/communication";

class LaunchpadCore {
  static readonly drivers = availableDrivers;

  private static _devicesInstance: {[key: string]: MidiService};
  readonly _instance: MidiService;
  readonly _driver: Driver;

  private _options = Options;

  constructor(driverName: string) {
    
    if (!(driverName in LaunchpadCore.drivers)) throw new Error("LaunchpadCore: driver not found.")

    this._driver = LaunchpadCore.drivers[driverName];
    this._instance = new MidiService(this._driver.MidiIn, this._driver.MidiOut);
    
    this.onEnabled()
    
    process.on("SIGINT", () => this.onDisabled())
    process.on("exit", () => this.onDisabled())
  }

  onEnabled() {

    const options = this._options
    const midi = this._instance    
    
    midi.out.send( Array<number>().concat(this._driver.setLayout(LayoutType.programmer), this._driver.textScrolling(37, "LX Deck")) );
    // Set default layout
    for (const [key, value] of Object.entries(options.Layout)) {
      midi.out.noteOn(value.display, key, value.color)
    }
    
    // Midi IN
    midi.in.connect((data: any) => { 
      switch (data[0]) {
        case options.Driver.input.onNote:
          NoteHandler.OnNote(data, midi);
      }
      //console.log(data)
    })
  }

  onDisabled() {
    const midi = this._instance
    midi.out.send( Array<number>().concat(this._driver.textScrolling(94, "Bye!"), this._driver.setLayout(LayoutType.note)) )
    midi.closeAll();
  }
}

const App = new LaunchpadCore("LaunchpadX");
