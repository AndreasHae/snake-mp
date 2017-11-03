const input = {
    up: false,
    down: false,
    left: false,
    right: false,
}

document.addEventListener('keydown', event => {
    switch (event.key) {
    case 'ArrowUp':
        input.up = true
        break
    case 'ArrowDown':
        input.down = true
        break
    case 'ArrowLeft':
        input.left = true
        break
    case 'ArrowRight':
        input.right = true
        break
    }
})

document.addEventListener('keyup', event => {
    switch (event.key) {
    case 'ArrowUp':
        input.up = false
        break
    case 'ArrowDown':
        input.down = false
        break
    case 'ArrowLeft':
        input.left = false
        break
    case 'ArrowRight':
        input.right = false
        break
    }
})

export default input