/*  .:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.

    **WIP** Useless Discord speech bubble image API
    2023, written by nitrate92 & HIDEN64
    Usage: run help.js 

    .:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:. */

let config = require('./config.json');
const fs = require("fs");
const http = require("http");
const mime = require('mime');
const host = config.main.host;
const port = config.main.port;
const balls = getImageListDynamic();

//pull these from my ass
function getImageListDynamic() {
    const feminineMenAreCool = fs.readFileSync(
        `./imageList.json`,
        { encoding: "utf8", flag: "r" }
    );
    console.log(`Image list loaded.`)
    return (JSON.parse(feminineMenAreCool));
}

const requestListener = function (req, res) {
    const fuckYou = (balls[Math.floor(Math.random() * balls.length)]);
    const fuckYouImgData = fs.readFileSync(
        `./servedContent/${fuckYou}`,
        { flag: "r" }
    );
    res.writeHead(200, {
        'Content-Type': mime.getType(fuckYou),
        'X-Powered-By': 'potatoes'
      });
    res.end(fuckYouImgData);
    console.log(`Returned ${fuckYou} with Content-Type "${mime.getType(fuckYou)}" to ${req.socket.remoteAddress}`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`API available for access at http://${host}:${port}`);
});