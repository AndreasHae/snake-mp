import { Sprite } from "pixi.js"
import Directions from "./directions"

class SnakeBody extends Sprite {
    constructor(texture, color) {
        super(texture)
        this.tint = color
        this.anchor.set(0.5, 0.5)
        this.velocity = 2
    }

    go(direction) {
        this._nextDirection = direction
    }

    update(dt) {
        switch (this.rotation) {
            case Directions.up:
                this.y -= this.velocity * dt
                break
            case Directions.down:
                this.y += this.velocity * dt
                break
            case Directions.left:
                this.x -= this.velocity * dt
                break
            case Directions.right:
                this.x += this.velocity * dt
                break
        }
    }

    _onCellTraversed() {
        this.direction = this._nextDirection
    }
}

export default SnakeBody