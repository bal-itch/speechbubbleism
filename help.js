/*  .:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.

    **WIP** Useless Discord speech bubble image API
    2023, written by nitrate92 & HIDEN64
    Usage: run help.js 

    .:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:. */

const fs = require("fs");
const http = require("http");
const mime = require('mime');
const host = require('./config.json').main.host;
const port = require('./config.json').main.port;
const funnyList = fs.readdirSync("./servedContent");

function getLastModified(file) {
    const { mtime, ctime } = fs.statSync(file)
    return new Date(mtime).toUTCString()
}

const requestListener = function (req, res) {
    const fuckYou = funnyList[Math.floor(Math.random() * funnyList.length)];
    const feminineMenAreCool = `./servedContent/${fuckYou}`;
    const fuckYouImgData = fs.readFileSync(feminineMenAreCool);

    res.writeHead(200, {
        'Content-Type': mime.getType(fuckYou),
        'Last-Modified': getLastModified(`./servedContent/${fuckYou}`),
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'X-Powered-By': 'potatoes'
    });
    res.end(fuckYouImgData);
    console.log(`Returned ${fuckYou}, Last-Modified "${getLastModified(`./servedContent/${fuckYou}`)}" with Content-Type "${mime.getType(fuckYou)}" to ${req.socket.remoteAddress}`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`API available for access at http://${host}:${port}`);
});
