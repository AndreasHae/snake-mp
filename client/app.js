import { Application, utils, Sprite, loader } from "pixi.js"
import { loadTextures } from "./textures"

const app = new Application({
    transparent: true,
    antialias: true
})
document.body.appendChild(app.view)

loadTextures().then((textures) => {
    const body = new Sprite(textures.body)
    body.tint = "0x123456"
    const eyes = new Sprite(textures.eyes)
    body.addChild(eyes)

    app.stage.addChild(body)
})
