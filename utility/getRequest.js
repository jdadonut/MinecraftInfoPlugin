const { get } = require("powercord/http")


async function getRequest(url) {
    const res = await get(url);
    return res.body;
}

module.exports = getRequest;