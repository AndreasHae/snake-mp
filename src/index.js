import { Application } from "pixi.js"
import Field from "./field"
import Snake from "./snake"
import SnakeBody from "./snakebody"
import registerControls from "./input"

const game = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    antialias: true
})

document.body.appendChild(game.view)

game.loader
    .add("body", "img/body.svg")
    .add("eyes", "img/eyes.svg")
    .add("ground", "img/ground.svg")
//    .on("progress", (loader) => drawProgressBar(loader.progress))
    .load(main)

/*function drawProgressBar(progress) {
    // TODO
}*/

function main() {
    const resources = game.loader.resources

    const field = new Field(8, 8, resources.ground.texture)
    game.stage.addChild(field)

    const color = Math.random() * 0xFFFFFF
    const snake = new Snake(2, 2, resources.body.texture, resources.eyes.texture, color, 3)
    game.stage.addChild(snake)

    registerControls(snake)

    game.ticker.add(() => {
        const dt = game.ticker.elapsedMS / 1000

        snake.update(dt)
        game.render()
    })
}

window.onresize = () => {
    game.renderer.resize(window.innerWidth, window.innerHeight)
}
