import midi from "jzz";
import MidiError from "./communication-error"

export default class MidiService {
  // Cant import declaration
  private _port = midi().openMidiOut();

  public _midiInput: typeof this._port;
  public _midiOutput: typeof this._port;

  private _deviceName: string;
  
  constructor(deviceName: string) {

    this._deviceName = deviceName;
    
    this._midiInput = midi().openMidiIn(this._deviceName).or("Device not connected.")
    this._midiOutput = midi().openMidiOut(this._deviceName).or("Device not connected.")
    
  }

  private openOutput() {
    this._midiOutput = midi().openMidiOut(this._deviceName).or("Device not connected.")
  }

  private closeOutput() {
    this._midiOutput.close();
  }

  public get out() {
    this.openOutput()
    setTimeout(() => { this.closeOutput() }, 500);
    return this._midiOutput
  };

  public get in() {
    return this._midiInput
  }

  public closeAll() {
    this._midiOutput.close();
    this._midiInput.close();
  }

}