import Game from './game'

const startModal = document.querySelector('#modal > #start')
const startBtn = startModal.querySelector('button')

const game = new Game()
document.body.appendChild(game.view)

startBtn.onclick = () => {
    const gameStartDelayMs = 200

    startModal.classList.add('invisible')
    setTimeout(() => {
        startModal.classList.add('hidden')
        game.begin()
    }, gameStartDelayMs)
}
