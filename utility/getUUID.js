/* 
    This file exports a function doing a GET request to minecraft-api.com
*/
const https = require("https");


function getUUID(name) {
    https.get("https://minecraft-api.com/api/uuid/" + name + "/json", (res) => {
        let data;
        res.on('data', (chunk) => {
            data += chunk;
            return data;
        })
    })
}

module.exports = getUUID;