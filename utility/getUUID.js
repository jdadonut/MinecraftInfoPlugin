/* 
    This file exports a function doing a GET request to minecraft-api.com
*/
const { get } = require("powercord/http")


async function getUUID(name) {
    const uuid = await get("https://minecraft-api.com/api/uuid/" + name + "/json");
    return uuid.body;
}

module.exports = getUUID;