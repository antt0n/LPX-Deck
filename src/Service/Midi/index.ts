import midi from 'jzz';
import * as jzz from 'jzz';

class midiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MidiService';
  }
}

export default class MidiService {
  private _midiInput = midi().openMidiOut();
  private _midiOutput = midi().openMidiOut();

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
    throw new midiError('Device not connected.');
  }

  private openOutput() {
    this._midiOutput = midi()
      .openMidiOut(this._midiOut)
      .or(() => this.midiError);
  }

  private closeOutput() {
    this._midiOutput.close();
  }

  public get out(): any {
    this.openOutput();
    setTimeout(() => {
      this.closeOutput();
    }, 500);
    return this._midiOutput;
  }

  public get in(): any {
    return this._midiInput;
  }

  public get midiQuery(): any {
    return jzz.MIDI;
  }

  public closeAll() {
    this._midiOutput.disconnect();
    this._midiInput.disconnect();
  }
}
