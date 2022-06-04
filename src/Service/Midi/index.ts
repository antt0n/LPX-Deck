import midi from 'jzz';
import MidiError from './midiError';

export default class MidiService {
  // Cant import declaration
  private _port = midi().openMidiOut();

  private _midiInput: typeof this._port;
  private _midiOutput: typeof this._port;

  private _midiIn: string;
  private _midiOut: string;

  constructor(midiIn: string, midiOut: string) {
    this._midiIn = midiIn;
    this._midiOut = midiOut;

    this._midiInput = midi()
      .openMidiIn(midiIn)
      .or(() => this.midiError);
    this._midiOutput = midi()
      .openMidiOut(midiIn)
      .or(() => this.midiError);
  }

  private get midiError() {
    throw new MidiError('Device not connected.');
  }

  private openOutput() {
    this._midiOutput = midi()
      .openMidiOut(this._midiOut)
      .or(() => this.midiError);
  }

  private closeOutput() {
    this._midiOutput.close();
  }

  public get out() {
    this.openOutput();
    setTimeout(() => {
      this.closeOutput();
    }, 500);
    return this._midiOutput;
  }

  public get in() {
    return this._midiInput;
  }

  public closeAll() {
    this._midiOutput.disconnect();
    this._midiInput.disconnect();
  }
}
