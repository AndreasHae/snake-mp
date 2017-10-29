import Circle from './circle'

class Fruit extends Circle {
    constructor(x, y, texture) {
        super(texture)

        this.x = x * 100 + 50
        this.y = y * 100 + 50
    }
}

export default Fruit