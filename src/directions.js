export const directions = {
    up: 0,
    right: Math.PI * 0.5,
    down: Math.PI,
    left: Math.PI * 1.5
}

export const opposites = {}
opposites[directions.up] = directions.down
opposites[directions.down] = directions.up
opposites[directions.left] = directions.right
opposites[directions.right] = directions.left
