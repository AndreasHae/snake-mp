import { Sprite } from "pixi.js"
import { directions } from "./directions"

class SnakeBody extends Sprite {
    constructor(texture, color) {
        super(texture)
        this.tint = color
        this.anchor.set(0.5, 0.5)
        this.velocity = 2
        this._turns = []
    }

    addTurn(x, y, direction) {
        this._turns.push({
            x, y,
            direction
        })
    }

    update(dt) {
        const nextTurn = this._turns[0]

        if (nextTurn && Math.abs(nextTurn.x - this.x) < 1 && Math.abs(nextTurn.y - this.y) < 1) {
            this.rotation = nextTurn.direction
            this._turns.shift()
        }

        this._move(dt)
    }

    _move(dt) {
        const deltaPosition = this.velocity * dt

        switch (this.rotation) {
            case directions.up:
                this.y -= deltaPosition
                break
            case directions.down:
                this.y += deltaPosition
                break
            case directions.left:
                this.x -= deltaPosition
                break
            case directions.right:
                this.x += deltaPosition
                break
        }
    }
}

export default SnakeBody