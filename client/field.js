import { Sprite } from 'pixi.js'
import Fixed2DArray from 'fixed-2d-array'

class Field extends Sprite {
    constructor(width, height, groundTexture) {
        super()

        this.cells = new CustomFixed2DArray(width, height, () => new Ground(groundTexture))
        this.cells.forEach((cell, coords) => {
            cell.x = coords.x * cell.width
            cell.y = coords.y * cell.height
            this.addChild(cell)
        })
    }
}

class CustomFixed2DArray extends Fixed2DArray {
    // TODO: contribute this to fixed-2d-array

    constructor(rows, cols, valueGenerator) {
        super(rows, cols, null)

        this.forEach((val, coords) => {
            this.set(coords.x, coords.y, valueGenerator(/*coords.x, coords.y*/)) // parameters would be cool, but are not needed currently
        })
    }
}

class Ground extends Sprite {
    constructor(texture) {
        super(texture)
    }
}

export default Field