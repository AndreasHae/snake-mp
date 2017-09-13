import Directions from "./directions"

export default function createControls(snake) {
    return event => {
        switch (event.key) {
            case "ArrowRight":
                snake.setDirection(Directions.right)
                break
            case "ArrowLeft":
                snake.setDirection(Directions.left)
                break
            case "ArrowUp":
                snake.setDirection(Directions.up)
                break
            case "ArrowDown":
                snake.setDirection(Directions.down)
                break
        }
    }
}