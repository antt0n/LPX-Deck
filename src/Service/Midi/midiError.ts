export default class midiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MidiService';
  }
}
