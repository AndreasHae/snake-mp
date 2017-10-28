import { Application } from "pixi.js"
import { directions } from "./directions"
import Field from "./field"
import Snake from "./snake"
import SnakeBody from "./snakebody"
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
//          .on("progress", (loader) => drawProgressBar(loader.progress))
            .load((loader, resources) => this.init(resources))
    }

    init(resources) {
        const field = new Field(8, 8, resources.ground.texture)
        this.stage.addChild(field)
    
        const color = Math.random() * 0xFFFFFF
        const snake = new Snake(2, 2, resources.body.texture, resources.eyes.texture, color, 3)

        this.stage.addChild(snake)
        this.snake = snake
    
        this.main()
    }

    main() {
        const dt = this.ticker.elapsedMS / 1000
        console.log(input)

        if (input.up) {
            this.snake.go(directions.up)
        }
        if (input.down) {
            this.snake.go(directions.down)
        }
        if (input.left) {
            this.snake.go(directions.left)
        }
        if (input.right) {
            this.snake.go(directions.right)
        }

        this.snake.update(dt)
        this.render()

        requestAnimationFrame(this.main.bind(this))
    }
}

export default Game