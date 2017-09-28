import { Application, loader } from "pixi.js"
import Field from "./field"
import Snake from "./snake"
import SnakeBody from "./snakebody"
import createControls from "./input"

const game = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    antialias: true
})

document.body.appendChild(game.view)

loader
    .add("body", "img/body.svg")
    .add("eyes", "img/eyes.svg")
    .add("ground", "img/ground.svg")
    .on("progress", (loader) => drawProgressBar(loader.progress))
    .load((loader, resources) => main(resources))

function drawProgressBar(progress) {
    // TODO
}

function main(resources) {
    const field = new Field(16, 8, resources.ground.texture)
    game.stage.addChild(field)

    const color = Math.random() * 0xFFFFFF
    const snake = new Snake(3, resources.body.texture, resources.eyes.texture, color)
    game.stage.addChild(snake)

    document.addEventListener("keydown", createControls(snake))

    /*app.ticker.add(() => {
        const dt = app.ticker.elapsedMS / 1000

        snake.update(dt)
        app.render()
    })*/
}

window.onresize = () => {
    game.renderer.resize(window.innerWidth, window.innerHeight)
}