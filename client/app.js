import { Application, utils, Sprite, loader } from "pixi.js"

const app = new Application({
    transparent: true
})
document.body.appendChild(app.view)

loader
    .add([
        "img/body.svg",
        "img/eyes.svg"
    ])
    .load(setup)

function setup() {
    const body = new Sprite(
        loader.resources["img/body.svg"].texture
    )
    body.tint = "0x123456"
    const eyes = new Sprite(
        loader.resources["img/eyes.svg"].texture
    )
    body.addChild(eyes)
    console.log("hello")
    app.stage.addChild(body)
}
