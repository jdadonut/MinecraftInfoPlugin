const { Plugin } = require("powercord/entities");
const Settings = require("./Settings.jsx")

// Import utilities
const getUUID = require("./utility/getUUID")


module.exports = class MCInfo extends Plugin {
  startPlugin() {
    const { getSetting } = powercord.api.settings._fluxProps("mc-info");
    powercord.api.settings.registerSettings("mc-info", {
        category: "mc-info",
        label: "MC Info",
        render: Settings
    })
    powercord.api.commands.registerCommand({
        command: "mcgetPlayer",
        description: "Provides the UUID of the player with the nickname given!",
        usage: "{c} nick",
        executor: (args) => {
            
        }

    })


    }

  pluginWillUnload() {
     powercord.api.settings.unregisterSettings("mc-info")
     powercord.api.settings.unregisterCommands("mcgetPlayer")
  }
}