import Directions from "./directions"

function registerControls(snake) {
    document.addEventListener("keydown", event => {
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
    })
}

export default registerControls