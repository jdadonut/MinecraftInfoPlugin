const { Plugin } = require("powercord/entities");

// Import utilities
const getUUID = require("./utility/getUUID");
const getRequest = require("./utility/getRequest")


module.exports = class MCInfo extends Plugin {
  startPlugin() {

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
            result: `You did not provide a subcommand.`
          }
        }


        // If these vars don't apply to some commands just leave it here
        const uuid = await getUUID(args[1]);
        const serverResponse = await getRequest(`https://mcapi.xdefcon.com/server/${args[1]}/full/json`);

        switch (args[0]) {
          case "fetchPlayer":
            if(!args[1]) {
              return {
                send: false,
                result: "You did not provide a player name"
              }
            }
            if (uuid.uuid == undefined) {
              return {
                send: false,
                result: `That player does not exist.`
              }
            }
            return {
              send: false,
              result: {
                type: "rich",
                title: `${args[1]}`,
                description: ``,
                fields: [{
                  name: "UUID",
                  value: `${args[1]}'s UUID is ${uuid.uuid}`,
                  inline: false
                },
                {
                  name: "Skin",
                  value: `You can download ${args[1]}'s skin by clicking [here](https://minotar.net/download/${uuid.uuid}), or show it by clicking [here](https://minotar.net/skin/${uuid.uuid})`,
                  inline: false
                }
              ],
                footer: {
                  text: `${uuid.uuid}`,
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
                  title: `${args[1]} is ${serverResponse.serverStatus}`,
                  description: ``,
                  fields: [{
                    name: "Version: ",
                    value: `${serverResponse.version}`,
                    inline: false
                  },
                  {
                    name: "Players online",
                    value: `${serverResponse.players}`,
                    inline: false
                  }
                ],
                  footer: {
                    text: `Numeric IP: ${serverResponse.serverip}`,
                    icon_url: `${serverResponse.icon}`
                  }
            }
          }
          default:
            break;
        }
        
        
      },
      autocomplete: (args) => {
        if(args[0]) {
          return
        } 
        return {
          commands: [{command: "fetchPlayer"}, {command: "fetchServer"}],
          header: "minecraft subcommands"
        }
      }

    });

  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("minecraft");
  }
};