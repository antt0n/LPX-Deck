import ActionType from "./Models/Config/actionType";
import BehaviorType from "./Models/Config/behaviorEnum"
import DisplayType from "./Models/Config/displayEnum"

const Layout: { [key: number]: any} = {
  11: {
    name: "Go to volume",
    color: 53,
    display: DisplayType.static,
    behavior: BehaviorType.trigger,
    category: "toolkit"
  },
  21: {
    name: "Discord deafen",
    color: 4,
    display: DisplayType.static,
    behavior: BehaviorType.trigger,
    category: "discord"
  },
  31: {
    name: "Discord mute",
    color: 4,
    display: DisplayType.static,
    behavior: BehaviorType.trigger,
    category: "discord"
  },
  41: {
    name: "Discord screenshare",
    color: 124,
    display: DisplayType.static,
    behavior: BehaviorType.trigger,
    category: "discord"
  },
  61: {
    name: "OBS Transition",
    color: 98,
    display: DisplayType.static,
    behavior: BehaviorType.trigger,
    category: "obs"
  },
  71: {
    name: "OBS Camera switch",
    color: 5,
    display: DisplayType.static,
    behavior: BehaviorType.toggle,
    category: "obs",
    action: {
      type: ActionType.Keyboard,
      data: ["numpad_1", ["control", "alt"]]
    }
  },
  62: {
    name: "OBS Scene Indisponible",
    color: 57,
    display: DisplayType.static,
    behavior: BehaviorType.option,
    category: "obs"
  },
  72: {
    name: "OBS Scene Webcam",
    color: 81,
    display: DisplayType.static,
    behavior: BehaviorType.option,
    category: "obs"
  },
  73: {
    name: "OBS Scene Full Screen webcam",
    color: 81,
    display: DisplayType.static,
    behavior: BehaviorType.option,
    category: "obs"
  },
  74: {
    name: "OBS Scene Game webcam",
    color: 81,
    display: DisplayType.static,
    behavior: BehaviorType.option,
    category: "obs"
  },
  63: {
    name: "OBS Scene Game",
    color: 94,
    display: DisplayType.static,
    behavior: BehaviorType.option,
    category: "obs"
  },
  64: {
    name: "OBS Scene Fullscreen",
    color: 94,
    display: DisplayType.static,
    behavior: BehaviorType.option,
    category: "obs"
  }
}

const Options = {
  DeviceName: "LPX MIDI",
  /**
    * Driver of the launchpad
    */
  Driver: {
    command: {
      /**
           * SysEx
           */
      sysexHeader: [240, 0, 32, 41, 2, 12],
      sysexFooter: 247,
      /**
        * Select layout command
        * 
        * - 0: Session (only selectable in DAW mode)
        * - 1: Note mode
        * - 4: Custom mode 1 (Drum Rack by factory default)
        * - 5: Custom mode 2 (Keys by factory default)
        * - 6: Custom mode 3 (Lighting mode in Drum Rack layout by factory default)
        * - 7: Custom mode 4 (Lighting mode in Session layout by factory default)
        * - 13: DAW Faders (only selectable in DAW mode)
        * - 127: Programmer mode
        *
        */
      selectLayout: 0,
      /**
        * Led SysEx command
        * 
        * - 0: Static colour from palette, Lighting data is 1 byte specifying palette entry.
        * - 1: Flashing colour, Lighting data is 2 bytes specifying Colour B and Colour A.
        * - 2: Pulsing colour, Lighting data is 1 byte specifying palette entry.
        * - 3: RGB colour, Lighting data is 3 bytes for Red, Green and Blue (127: Max, 0: Min)
        */
      ledLightning: 3,
      /**
        * Text scolling command
        * 
        * - [loop] (1 byte) specifies whether the text should loop, 0: don’t loop, 1: loop.
        * - [speed] (1 byte) is the scrolling speed expressed in pads / second units.
        * - [colourspec] (2 – 4 bytes) is a colour specification.
        * - [text] is the text to display in ASCII.
        */
      textScrolling: 7,
      /**
         * Brightness level command
         */
      brightness: 8,
      /**
         * Programmer or Live mode command
         */
      programmer: 14,
      
      /**
        * Channels for LightningCustomMode
        */
      LightningCustomMode: {
        static: 1,
        flashing: 2,
        pulsing: 3
      }
    },
    input: {
      onNote: 144
    }
  },
  Layout
}
export default Options;