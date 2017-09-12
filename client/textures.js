import { loader } from "pixi.js"

const cache = {}

export function loadTextures() {
    return new Promise((resolve, reject) => {
        if (Object.keys(cache).length === 0) {
            loader
                .add([
                    "img/body.svg",
                    "img/eyes.svg"
                ])
                .load(() => {
                    cache.body = loader.resources["img/body.svg"].texture
                    cache.eyes = loader.resources["img/eyes.svg"].texture

                    resolve(cache)
                })
        } else {
            resolve(cache)
        }
    })    
}