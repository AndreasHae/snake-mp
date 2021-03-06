import { Application, utils } from 'pixi.js'
import { directions } from './directions'
import Field from './field'
import Snake from './snake'
import Fruit from './fruit'

import input from './input'

class Game extends Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            antialias: true,
        })

        this.events = new utils.EventEmitter()
        this.events.on('gameover', () => {
            if (this.score > this.highscore) {
                this.highscore = this.score
            }
        })

        this.loader
            .add('body', 'img/body.svg')
            .add('eyes', 'img/eyes.svg')
            .add('ground', 'img/ground.svg')
            .add('fruit', 'img/fruit.svg')
            //.on('progress', (loader) => drawProgressBar(loader.progress))
            .load((loader, resources) => this.init(resources))
    }

    init(resources) {
        // Inject resources
        this.createField = (width, height) => new Field(height, width, resources.ground.texture)
        this.createSnake = (x, y, length, color) => new Snake(x, y, resources.body.texture, resources.eyes.texture, color, length)
        this.createFruit = (x, y) => new Fruit(x, y, resources.fruit.texture)

        const fieldWidth = Math.floor(this.screen.width / resources.ground.texture.width)
        const fieldHeight = Math.floor(this.screen.height / resources.ground.texture.height)
        const fieldOffset = {
            x: (this.screen.width % resources.ground.texture.width) / 2,
            y: (this.screen.height % resources.ground.texture.height) / 2,
        }

        this.highscore = localStorage.getItem('highscore') || 0

        this.field = this.createField(fieldWidth, fieldHeight)
        this.field.x = fieldOffset.x
        this.field.y = fieldOffset.y
        this.stage.addChild(this.field)
    }

    begin() {
        this.reset()

        this.score = 0

        const initialLength = 3
        const color = Math.random() * 0xFFFFFF

        this.snake = this.createSnake(
            this.field.tileWidth / 2,
            this.field.tileHeight / 2,
            initialLength,
            color)
        this.stage.addChild(this.snake)

        this.spawnFruit()

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
            this.events.emit('gameover')
        }

        for (let i = 0; i < this.snake.children.length - 3; i++) {
            if (this.snake.head.collidesWithCircle(this.snake.children[i])) {
                this.snake.die()
                this.events.emit('gameover')
            }
        }

        if (this.fruit && this.snake.head.collidesWithCircle(this.fruit)) {
            this.fruit.destroy()
            this.fruit = null
            this.snake.addBody()

            this.score += 1

            this.spawnFruit()
        }

        this.render()

        if (this.snake.alive) {
            requestAnimationFrame(this.main.bind(this))
        }
    }

    spawnFruit() {
        if (this.fruit) {
            this.fruit.destroy()
            this.fruit = null
        }

        const randomBetween = (start, end) => start + Math.random() * end
        const collidesWithSnake = (circle) => this.snake.children.filter(bodyPart => bodyPart.collidesWithCircle(circle)).length != 0
        do {
            this.fruit = this.createFruit(
                randomBetween(this.field.x / 100, this.field.x / 100 + this.field.tileWidth - 1),
                randomBetween(this.field.y / 100, this.field.y / 100 + this.field.tileHeight - 1)
            )
        }
        while (collidesWithSnake(this.fruit))

        this.stage.addChild(this.fruit)
    }

    reset() {
        if (this.snake != null) {
            this.snake.destroy()
            this.snake = null
        }

        if (this.fruit != null) {
            this.fruit.destroy()
            this.fruit = null
        }
    }
}

export default Game