const opacityTransitionMs = 200

export function hideModal(modal) {
    modal.classList.add('invisible')

    return new Promise(resolve => {
        setTimeout(() => {
            modal.classList.add('hidden')
            resolve()
        }, opacityTransitionMs)
    })
}

export function showModal(modal) {
    modal.classList.remove('hidden')

    return new Promise(resolve => {
        setTimeout(() => {
            modal.classList.remove('invisible')
            resolve()
        }, opacityTransitionMs)
    })
}
