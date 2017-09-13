import { Sprite } from "pixi.js"

export default class Snake {
    constructor(length, textures, baseColor) {
        this.textures = textures

        const base = new Sprite()

        const head = new Sprite(textures.body)
        head.tint = baseColor
        head.anchor.set(0.5, 0.5)

        const eyes = new Sprite(textures.eyes)
        eyes.anchor.set(0.5, 0.5)
        head.addChild(eyes)

        base.addChild(head)

        this.sprites = {
            base,
            head,
            body: []
        }

        for (let i = 0; i < length; i++) {
            this.addBody()
        }
    }

    addBody() {
        let color
        if (this.sprites.body.length === 0) {
            color = this.sprites.head.tint
        } else {
            color = this.sprites.body[this.sprites.body.length - 1].tint
        }
        color = darken(color, 8)

        const bodyPart = new Sprite(this.textures.body)
        bodyPart.tint = color
        bodyPart.anchor.set(0.5, 0.5)
        bodyPart.y = 0.5 * (this.sprites.body.length + 1) * bodyPart.height
        this.sprites.base.addChildAt(bodyPart, 0)
        this.sprites.body.push(bodyPart)
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