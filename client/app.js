import { Application, loader } from "pixi.js"
import { loadTextures } from "./textures"
import Field from "./field"
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
    /*const color = Math.random() * 0xFFFFFF
    const snake = new Snake(5, textures, color)
    snake.y = 100
    snake.x = 100
    app.stage.addChild(snake)

    document.addEventListener("keydown", createControls(snake))

    app.ticker.add(() => {
        const dt = app.ticker.elapsedMS / 1000

        snake.update(dt)
        app.render()
    })*/

    const field = new Field(16, 8, textures.ground)
    app.stage.addChild(field)
})

window.onresize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight)
}