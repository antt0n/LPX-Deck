# Launchpad Core

Simple way to control your Novation Launchpad.

## Features

- Driver system (for supporting all Launchpad - more compatibility in progress)
- Advanced commands
- Light, powerful and flexible.

## Installation

```bash
  // NPM
  npm install launchpadcore

  // Yarn
  yarn add launchpadcore
```

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
