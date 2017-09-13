import { Application, utils, Sprite, loader } from "pixi.js"
import { loadTextures } from "./textures"
import Snake from "./snake"

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    antialias: true
})
document.body.appendChild(app.view)

const textures = loadTextures().then((textures) => {
    const color = Math.random() * 0xFFFFFF
    const snake = new Snake(10, textures, color)
    snake.sprites.base.y = 100
    snake.sprites.base.x = 100
    app.stage.addChild(snake.sprites.base)
})

window.onresize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight)
}