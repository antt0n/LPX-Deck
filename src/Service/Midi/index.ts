import midi from 'jzz';
import * as jzz from 'jzz';
import MidiError from './midiError';

export default class MidiService {
  // Cant import declaration
  private midi = midi().openMidiOut();

  private _midiInput = midi().openMidiOut();
  private _midiOutput = midi().openMidiOut();

  private _midiIn: string;
  private _midiOut: string;

  constructor(midiIn: string, midiOut: string) {
    this._midiIn = midiIn;
    this._midiOut = midiOut;

    type _midiInput = keyof typeof this._port;

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
    return jzz.MIDI
  }

  public closeAll() {
    this._midiOutput.disconnect();
    this._midiInput.disconnect();
  }
}
