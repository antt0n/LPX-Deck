export default class CommunicationError extends Error {

  constructor(message: string) {
      super(message)
      this.name = "MidiService";
  }

}