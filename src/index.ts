import Core from "./application/core/core"

console.clear()

const core = new Core()

setImmediate(async () => {
    await core.init()
})