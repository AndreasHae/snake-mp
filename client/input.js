import Directions from "./directions"

export default function createControls(snake) {
    return event => {
        switch (event.key) {
            case "ArrowRight":
                snake.go(Directions.right)
                break
            case "ArrowLeft":
                snake.go(Directions.left)
                break
            case "ArrowUp":
                snake.go(Directions.up)
                break
            case "ArrowDown":
                snake.go(Directions.down)
                break
        }
    }
}