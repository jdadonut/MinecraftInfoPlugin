const { React } = require("powercord/webpack");
const { TextInput } = require("powercord/components/settings");

module.exports = class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <TextInput
        value={this.props.getSetting("hypixelApiKey", "")}
        onChange={v => this.props.updateSetting("hypixelApiKey", v)}
        note={"Value (debug) : " + this.props.getSetting("hypixelApiKey")}
        >
            Hypixel API Key
        </TextInput>
    )
  }
}