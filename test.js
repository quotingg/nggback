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
        delete req.headers['x-forwarded-host'];
        delete req.headers['x-forwarded-proto'];
        delete req.headers['x-real-ip'];
        delete req.headers['forwarded'];

        // vercel
        delete req.headers['x-vercel-ip-country-region'];
        delete req.headers['x-vercel-deployment-url'];
        delete req.headers['x-vercel-ip-city'];
        delete req.headers['x-vercel-ip-latitude'];
        delete req.headers['x-vercel-ip-postal-code'];
        delete req.headers['x-vercel-ip-timezone'];
        delete req.headers['x-vercel-proxy-signature-ts'];
        delete req.headers['x-vercel-id'];
        delete req.headers['x-vercel-ip-as-number'];
        delete req.headers['x-vercel-ja4-digest'];
        delete req.headers['x-vercel-ip-country'];
        delete req.headers['x-vercel-ip-continent'];
        delete req.headers['x-vercel-internal-ingress-bucket'];
        delete req.headers['x-vercel-ip-longitude'];
        delete req.headers['x-vercel-proxy-signature'];
        delete req.headers['x-vercel-proxied-for'];
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
