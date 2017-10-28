import { Sprite } from 'pixi.js'

class Field extends Sprite {
    constructor(height, width, cellTexture) {
        super()

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const cell = Sprite.from(cellTexture)
                cell.x = col * cell.width
                cell.y = row * cell.height

                this.addChild(cell)
            }
        }
    }
}

export default Field