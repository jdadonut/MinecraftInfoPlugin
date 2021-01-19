const {
  Plugin
} = require("powercord/entities");
const Settings = require("./Settings.jsx");

const fetchPlayer = {
  command: "fetchPlayer",
  description: "haha get rekd4",
  usage: "{c}",
  executor: "this is a dummy string cuz i am bad developer and this is workaround :DDD"
}

const fetchServer = {
  command: "fetchServer",
  description: "haha get rekd4",
  usage: "{c}",
  executor: "this is a dummy string cuz i am bad developer and this is workaround :DDD"
}



// Import utilities
const getUUID = require("./utility/getUUID");
const getRequest = require("./utility/getRequest")


module.exports = class MCInfo extends Plugin {
  startPlugin() {
    const {
      getSetting
    } = powercord.api.settings._fluxProps("mc-info");

    powercord.api.settings.registerSettings("mc-info", {
      category: "mc-info",
      label: "MC Info",
      render: Settings,
    });

    powercord.api.commands.registerCommand({
      command: "minecraft",
      description: "Minecraft command group.",
      usage: "{c} subcommand",
      executor: async (args) => {

        // If we have not got a subcommand display an error message
        if (!args[0]) {
          console.warn("User of this discord client messed up, sending nukes...")
          return {
            send: false,
            result: `Well, you did not provide any subcommand Sending info to North Korea`
          }
        }


        // If these vars don't apply to some commands just leave it here
        const uuid = await getUUID(args[1]);
        const serverResponse = await getRequest(`https://mcapi.xdefcon.com/server/${args[1]}/full/json`);

        console.log(serverResponse)

        switch (args[0]) {
          case "fetchPlayer":
            if(!args[1]) {
              return 0;
            }
            if (uuid.uuid == undefined) {
              return {
                send: false,
                result: `wtf? that player does not exist like wtf`
              }
            }
            return {
              send: false,
              result: {
                type: "rich",
                title: `${args[1]}'s profile`,
                description: `So, ${args[1]}'s uuid is ${uuid.uuid}, 
                the player looks like [this](https://crafatar.com/renders/body/${uuid.uuid})`,
                footer: {
                  text: `Avatar`,
                  icon_url: `https://crafatar.com/renders/head/${uuid.uuid}`
                }
              }
            }
            break;
          case "fetchServer":
              return {
                send: false,
                result: {
                  type: "rich",
                  title: `${args[1]}`,
                  description: `So, ${args[1]} is ${serverResponse.serverStatus}`,
                  footer: {
                    text: `Icon`,
                    icon_url: `${serverResponse.icon}`
                  }
            }
          }
            break;
          default:
            break;
        }
        
        
      },
      autocomplete: (args) => {
        if(args[0]) {
          return
        }
        return {
          commands: [fetchPlayer, fetchServer],
          header: "minecraft SubCommands"
        }
      }

    });
  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("mc-info");
    powercord.api.commands.unregisterCommand("minecraft");
  }
};