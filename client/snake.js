import { Sprite } from "pixi.js"
import SnakeHead from "./snakehead"
import SnakeBody from "./snakebody"

export default class Snake extends Sprite {
    constructor(length, textures, baseColor) {
        super()

        this.velocity = 2

        this._textures = textures

        this.head = new SnakeHead(this._textures.body, baseColor, this._textures.eyes)
        this.head.velocity = this.velocity
        this.addChild(this.head)

        for (let i = 1; i < length; i++) {
            this.addBody()
        }
    }

    addBody() {
        let color = this.children[0].tint
        color = darken(color, 8)

        const bodyPart = new SnakeBody(this._textures.body, color)
        bodyPart.y = 0.5 * (this.children.length) * bodyPart.height
        bodyPart.velocity = this.velocity

        this.addChildAt(bodyPart, 0)
    }
    
    go(direction) {
        this.head.go(direction)
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
