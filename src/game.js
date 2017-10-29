import { Application } from "pixi.js"
import { directions } from "./directions"
import Field from "./field"
import Snake from "./snake"
import Fruit from './fruit'

import input from "./input"

class Game extends Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            antialias: true
        })

        this.loader
            .add("body", "img/body.svg")
            .add("eyes", "img/eyes.svg")
            .add("ground", "img/ground.svg")
            .add("fruit", "img/fruit.svg")
//          .on("progress", (loader) => drawProgressBar(loader.progress))
            .load((loader, resources) => this.init(resources))
    }

    init(resources) {
        const field = new Field(8, 8, resources.ground.texture)
        this.stage.addChild(field)
        this.field = field

        const color = Math.random() * 0xFFFFFF
        const snake = new Snake(2, 2, resources.body.texture, resources.eyes.texture, color, 3)

        this.stage.addChild(snake)
        this.snake = snake

        this.fruit = new Fruit(5, 5, resources.fruit.texture)
        this.stage.addChild(this.fruit)

        this.main()
    }

    main() {
        const dt = this.ticker.elapsedMS / 1000

        if (input.up) {
            this.snake.go(directions.up)
        } else if (input.down) {
            this.snake.go(directions.down)
        } else if (input.left) {
            this.snake.go(directions.left)
        } else if (input.right) {
            this.snake.go(directions.right)
        }

        this.snake.update(dt)

        if (! this.field.encloses(this.snake.head)) {
            this.snake.die()
        }

        if (this.fruit && this.snake.head.collidesWithCircle(this.fruit)) {
            this.fruit.destroy()
            this.fruit = null
        }

        this.render()

        requestAnimationFrame(this.main.bind(this))
    }
}

export default Game