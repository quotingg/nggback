const exp = require("express");
const prox = require("express-http-proxy");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("node:path");
const app = exp();
let Express = exp;
let Path = path;
let App = app;

App.use("/nowgg-static", Express.static(Path.join(__dirname, "nowgg-static")));
App.use("/apps", Express.static(Path.join(__dirname, "apps")));
App.use("/play", Express.static(Path.join(__dirname, "play")));
App.use("/3", Express.static(Path.join(__dirname, "3")));


/*const targ = "https://doctoraux.com"
const prox = createProxyMiddleware({
    target: targ,
    changeOrigin: true,
    secure: true,
    logLevel: "debug",
    router: function (req) {
        if (req.headers.host === new URL(targ).host) {
            req.headers['X-Forwarded-For'] = '';
            req.headers['X-Real-IP'] = '';
            req.headers['Via'] = '';
        }
        return targ;
    }
})*/

app.get("/", (_Request, Response) => {
    Response.sendFile(path.join(__dirname, "apps/rawblax", "now.html"));
})
app.use("/", prox('https://educationbluesky.com'));
app.listen(5000, () => {
    console.log("run");
})