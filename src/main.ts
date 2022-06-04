import MidiService from "./Service/Midi/communication"
import Options from "./config";
import MidiQuery from "./Manager/midiQueryManager";
import LayoutType from "./Models/Config/layoutEnum"
import NoteHandler from './Handler/NoteHandler'

class LXDeck {
  private _midi: MidiService;
  private _options = Options;

  constructor() {
    
    this._midi = new MidiService(this._options.DeviceName);
    
    this.onEnabled()
    
    process.on("SIGINT", () => this.onDisabled())
    process.on("exit", () => this.onDisabled())
  }

  onEnabled() {
    const options = this._options
    const midi = this._midi

    midi.out.send( Array<number>().concat(MidiQuery.setLayout(LayoutType.programmer), MidiQuery.textScrolling(37, "LX Deck")) );
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
    this._midi.out.send( Array<number>().concat(MidiQuery.textScrolling(94, "Bye!"), MidiQuery.setLayout(LayoutType.note)) )
    this._midi.closeAll();
  }
}

const App = new LXDeck();

