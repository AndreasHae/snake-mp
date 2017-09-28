import { Sprite } from "pixi.js"
import Directions from "./directions"

class SnakeBody extends Sprite {
    constructor(texture, color) {
        super(texture)
        this.tint = color
        this.anchor.set(0.5, 0.5)
        this.velocity = 2

        this._traversed = 0
    }

    go(direction) {
        this._nextDirection = direction
    }

    update(dt) {
        const deltaPosition = this.velocity * dt

        this._traversed += deltaPosition

        if (this._traversed <= 100) {
            switch (this.rotation) {
                case Directions.up:
                    this.y -= deltaPosition
                    break
                case Directions.down:
                    this.y += deltaPosition
                    break
                case Directions.left:
                    this.x -= deltaPosition
                    break
                case Directions.right:
                    this.x += deltaPosition
                    break
            }
        } else {
            this._onCellTraversed()
            this._traversed = 0
        }
    }

    _onCellTraversed() {
        this.rotation = this._nextDirection
    }
}

export default SnakeBody