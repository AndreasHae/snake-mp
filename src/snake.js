import { opposites, directions } from './directions'
import { Sprite } from 'pixi.js'
import SnakeHead from './snakehead'
import SnakeBody from './snakebody'

class Snake extends Sprite {
    constructor(x, y, bodyTexture, eyeTexture, baseColor, length) {
        super()

        this.alive = true
        this.velocity = 200
        this.currentDirection = 0
        this._bodyTexture = bodyTexture

        // add head
        const head = new SnakeHead(bodyTexture, baseColor, eyeTexture)

        // convert x and y from cells to pixel
        // add 50% of texture size to get the middle
        head.x = bodyTexture.height * x + 50
        head.y = bodyTexture.width * y + 50

        head.velocity = this.velocity

        this.addChild(head)
        this.head = head

        // add children
        for (let i = 1; i < length; i++) {
            this.addBody()
        }
    }

    addBody() {
        const lastBody = this.children[0]
        const color = darken(lastBody.tint, 8)

        const bodyPart = new SnakeBody(this._bodyTexture, color)
        bodyPart.rotation = lastBody.rotation
        bodyPart._turns = Array.from(lastBody._turns)
        bodyPart.velocity = this.velocity

        if (lastBody.rotation == directions.up) {
            bodyPart.x = lastBody.x
            bodyPart.y = lastBody.y + 0.5 * bodyPart.height
        } else if (lastBody.rotation == directions.down) {
            bodyPart.x = lastBody.x
            bodyPart.y = lastBody.y - 0.5 * bodyPart.height
        } else if (lastBody.rotation == directions.left) {
            bodyPart.x = lastBody.x + 0.5 * bodyPart.height
            bodyPart.y = lastBody.y
        } else if (lastBody.rotation == directions.right) {
            bodyPart.x = lastBody.x - 0.5 * bodyPart.height
            bodyPart.y = lastBody.y
        } else {
            console.error('Snake body is moving in impossible direction') // eslint-disable-line no-console
        }

        this.addChildAt(bodyPart, 0)
    }

    go(direction) {
        if (direction !== opposites[this.currentDirection] && direction !== this.currentDirection) {
            this.children.forEach(body => body.addTurn(
                this.head.x,
                this.head.y,
                direction
            ))

            this.currentDirection = direction
        }

    }

    update(dt) {
        if (this.alive) {
            this.children.forEach(child => child.update(dt))
        }
    }

    die() {
        this.alive = false
    }
}

function darken(color, darkness) {
    let r = (color >> 16) & 255
    let g = (color >> 8) & 255
    let b = color & 255

    function subtractOrZero(a, b) {
        const result = a - b
        return result > 0 ? result : 0
    }

    r = subtractOrZero(r, darkness)
    g = subtractOrZero(g, darkness)
    b = subtractOrZero(b, darkness)

    return (r << 16) | (g << 8) | b
}

export default Snake
