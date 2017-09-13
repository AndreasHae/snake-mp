import { Sprite } from "pixi.js"
import SnakeBody from "./snakebody"

class SnakeHead extends SnakeBody {
    constructor(bodyTexture, color, eyesTexture) {
        super(bodyTexture, color)

        this.eyes = new Sprite(eyesTexture)
        this.eyes.anchor.set(0.5, 0.5)

        this.addChild(this.eyes)
    }
}

export default SnakeHead