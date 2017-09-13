import { Application, utils, Sprite, loader } from "pixi.js"
import { loadTextures } from "./textures"
import Snake from "./snake"
import createControls from "./input"

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    antialias: true
})
document.body.appendChild(app.view)

loadTextures().then((textures) => {
    const color = Math.random() * 0xFFFFFF
    const snake = new Snake(3, textures, color)
    snake.sprites.base.y = 100
    snake.sprites.base.x = 100
    app.stage.addChild(snake.sprites.base)

    document.addEventListener("keydown", createControls(snake))

    setInterval(() => {
        requestAnimationFrame(gameLoop.bind(null, snake))
    }, 0)
})

function gameLoop(snake) {
    snake.update()
    app.render()
}

window.onresize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight)
}