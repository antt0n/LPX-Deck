# Launchpad Core

Simple way to control your Novation Launchpad.

## Features

- Driver system (for supporting all Launchpad - more compatibility in progress)
- Advanced commands
- Light, powerful and flexible.

*Note: Only tested with Launchpad X for now.*

## Installation

```bash
  // NPM
  npm install launchpadcore

  // Yarn
  yarn add launchpadcore
```

## Supported devices
Launchpad Core offers a driver system to adapt to the different existing models of Novation Launchpad.

| Name        | Status                |
| :---------- | :------------------------- |
| Launchpad X | Available
| Launchpad MK2 | Work in progress... |
| Launchpad Pro MK3 | Work in progress... |
| Launchpad Mini MK3 | Work in progress... |

## Usage/Examples

Here is a typical example of what can be done with this module.

```javascript
import LaunchpadCore from "launchpadcore"

const App = new LaunchpadCore("LaunchpadX");

App.on("onEnabled", (instance, driver) => {
    instance.out.send(driver.textScrolling(15, "Welcome!"))
})

App.on("onMidiIn", (data) => {
    console.log(data)
})

App.on("onDisabled", () => {
    console.log("Shutdown...")
})
```

## What's can I do ?

### Events
| Name        | Description                |
| :---------- | :------------------------- |
| `onEnabled` | When enable (after connection) | 
| `onDisabled` | When disable (exit the program) | 
| `onMidiIn` | When new message received | 


### MIDI methods
Usable on a MidiService object. Find more at: https://jazz-soft.net/doc/JZZ/.

| Name        | Description                |
| :---------- | :------------------------- |
| `out.send()` | Send whatever you want | 
| `out.noteOn()` | Send noteOn | 
| `out.noteOff()` | Send noteOff | 

### Launchpad features (DriverQuery Builder)
Usable on a Driver object.

| Name        | Description                | Driver |
| :---------- | :------------------------- | :------|
| `setLayout()` | Set your LaunchPad layout | LaunchpadX
| `textScrolling()` | Scroll a text along your launchpad pads | LaunchpadX
| `programmerToggle()` | Toggle to programmer mode | LaunchpadX
| `dawClear()` | Clear DAW layouts | LaunchpadX
| `ledLightning()` | Set pads colors by SysEx | LaunchpadX
| `ledBrightness()` | Set brightness of your launchpad | LaunchpadX
| `ledSleep()` | Disable LED of your launchpad | LaunchpadX
