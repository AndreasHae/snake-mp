import { opposites } from "./directions"
import { Sprite } from "pixi.js"
import SnakeHead from "./snakehead"
import SnakeBody from "./snakebody"

class Snake extends Sprite {
    constructor(x, y, bodyTexture, eyeTexture, baseColor, length) {
        super()

        // convert x and y from "cells" to pixel
        // add 50% of texture size to get the middle
        this.x = 1.5 * bodyTexture.height * x
        this.y = 1.5 * bodyTexture.width * y

        this.velocity = 200
        this.currentDirection = 0

        this._bodyTexture = bodyTexture
        
        // add head
        this.head = new SnakeHead(bodyTexture, baseColor, eyeTexture)
        this.head.velocity = this.velocity
        this.addChild(this.head)

        // add children
        for (let i = 1; i < length; i++) {
            this.addBody()
        }
    }

    addBody() {
        let color = this.children[0].tint
        color = darken(color, 8)

        const bodyPart = new SnakeBody(this._bodyTexture, color)
        bodyPart.y = 0.5 * this.children.length * bodyPart.height
        bodyPart.velocity = this.velocity

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
        this.children.forEach(child => child.update(dt))
    }
}

function darken(color, darkness) {
    let r = (color >> 16) & 255
    let g = (color >> 8) & 255
    let b = color & 255

    function subtractOrZero(a, b) {
        if ((a - b) < 0) {
            return 0
        }
        return a - b
    }

    r = subtractOrZero(r, darkness)
    g = subtractOrZero(g, darkness)
    b = subtractOrZero(b, darkness)

    return (r << 16) | (g << 8) | b;
}

export default Snake
