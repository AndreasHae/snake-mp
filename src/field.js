import { Sprite } from 'pixi.js'

class Field extends Sprite {
    constructor(height, width, cellTexture) {
        super()

        this.tileHeight = height
        this.tileWidth = width

        this.totalHeight = height * cellTexture.height
        this.totalWidth = width * cellTexture.width

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const cell = Sprite.from(cellTexture)
                cell.x = col * cell.width
                cell.y = row * cell.height

                this.addChild(cell)
            }
        }
    }

    encloses(sprite) {
        const spriteBounds = sprite.getBounds()

        return spriteBounds.top >= 0
            && spriteBounds.bottom <= this.totalHeight
            && spriteBounds.left >= 0
            && spriteBounds.right <= this.totalWidth
    }
}

export default Field