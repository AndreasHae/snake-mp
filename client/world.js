class World {
    constructor(width, height) {
        this.world = []
        for (let row = 0; i < height; row++) {
            this.world.push([])
            for (let col = 0; i < width; col++) {
                this.world[row].push(null)
            }
        }
    }
}