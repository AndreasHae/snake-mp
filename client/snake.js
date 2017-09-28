import { Sprite } from "pixi.js"
import SnakeHead from "./snakehead"
import SnakeBody from "./snakebody"

export default class Snake extends Sprite {
    constructor(x, y, bodyTexture, eyeTexture, baseColor, length) {
        super()

        this.x = 50 + bodyTexture.height * x
        this.y = 50 + bodyTexture.width * y

        this.velocity = 200

        this._bodyTexture = bodyTexture
        
        this.head = new SnakeHead(bodyTexture, baseColor, eyeTexture)
        this.head.velocity = this.velocity
        this.addChild(this.head)

        for (let i = 1; i < length; i++) {
            this.addBody()
        }
    }

    addBody() {
        let color = this.children[0].tint
        color = darken(color, 8)

        const bodyPart = new SnakeBody(this._bodyTexture, color)
        bodyPart.y = 0.5 * (this.children.length) * bodyPart.height
        bodyPart.velocity = this.velocity

        this.addChildAt(bodyPart, 0)
    }
    
    go(direction) {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].go(direction)
        }
        /*let reversedIndex = 0
        for (let i = this.children.length - 1; i >= 0; i--) {            
            const secondsUntilChange = reversedIndex * (this.children[i].width / 2) / this.velocity
            setTimeout(() => this.children[i].go(direction), secondsUntilChange * 1000)
            reversedIndex++
        }*/
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
