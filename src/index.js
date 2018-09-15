import { showModal, hideModal } from './modals'
import Game from './game'

const game = new Game()
document.body.appendChild(game.view)

const startModal = document.querySelector('#modal > #start')
const gameOverModal = document.querySelector('#modal > #gameover')

startModal.querySelector('button').onclick = () => {
    hideModal(startModal).then(() => game.begin())
}
gameOverModal.querySelector('button').onclick = () => {
    hideModal(gameOverModal).then(() => game.begin())
}

game.events.on('gameover', () => {
    showModal(gameOverModal)
})
