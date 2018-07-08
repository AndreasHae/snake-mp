import { Sprite } from 'pixi.js'

class Circle extends Sprite {
    constructor(texture) {
        super(texture)

        this.anchor.set(0.5, 0.5)
    }

    getRadius() {
        return this.width / 2
    }

    collidesWithCircle(other) {
        const dx = this.x - other.x
        const dy = this.y - other.y
        const distance = Math.sqrt(dx ** 2 + dy ** 2)

        return distance < this.getRadius() + other.getRadius()
    }
}

export default Circle