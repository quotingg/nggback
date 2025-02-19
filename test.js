const exp = require("express");
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


const targ = "https://doctoraux.com"
const prox = createProxyMiddleware({
    target: targ,
    changeOrigin: true,
    secure: true,
    logLevel: "debug",
    router: function (req) {
        delete req.headers['x-forwarded-for'];
        delete req.headers['x-forwarded-proto'];
        delete req.headers['x-real-ip'];
        console.log(req.headers);
        return targ;
    }
})

app.get("/", (_Request, Response) => {
    Response.sendFile(path.join(__dirname, "apps/uncube/10005", "now.html"));
})
app.use("/", prox);
app.listen(5000, () => {
    console.log("run");
})
