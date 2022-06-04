import Options from "../config";
import LayoutType from "../Models/Config/layoutEnum"
import BehaviorType from "../Models/Config/behaviorEnum";
import DisplayType from "../Models/Config/displayEnum";
import Robot from "robotjs"

class NoteHandler {

  private static _storagePad: { [key: number]: boolean} = {};
  private static _storageOptions: { [key: string]: number} = {};

  constructor() {}

  public static OnNote(data: any, midi: any) {
    const options = Options;
    const note: number = data[1];
    const velocity: number = data[2];

    if (note in options.Layout) {
      const pad = options.Layout[note];

      switch (pad.behavior) {

        case BehaviorType.trigger:
          // OnPress
          if (velocity != 0) {
            midi.out.noteOn(DisplayType.static, note, 21)
            
            break;
          }
          // OnHold
          midi.out.noteOn(pad.display, note, pad.color)
          break;

        case BehaviorType.toggle:
          // On Press
          if (velocity == 0) break;
          if (this._storagePad[note]) {
            midi.out.noteOn(pad.display, note, pad.color)
            this._storagePad[note] = false;
            break
          }
          this._storagePad[note] = true;
          midi.out.noteOn(DisplayType.static, note, 21)
          break;

        case BehaviorType.option:
          // OnPress
          if (velocity == 0) break;
            
          if (this._storageOptions[pad.category]) {
            if (this._storageOptions[pad.category] == note) {
              this._storageOptions[pad.category] = 0;
              midi.out.noteOn(pad.display, note, pad.color)
              break;
            }
            const memorizedNote = Options.Layout[this._storageOptions[pad.category]];
            midi.out.noteOn(memorizedNote.display, this._storageOptions[pad.category], memorizedNote.color)
          }

          this._storageOptions[pad.category] = note;

          midi.out.noteOn(DisplayType.pulsing, note, pad.color)
          break;
      }
    }
  }

}
export default NoteHandler;