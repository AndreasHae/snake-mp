const path = require("path")

module.exports = {
    entry: "./client/app.js",
    output: {
        filename: "game.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "inline-source-map",
}