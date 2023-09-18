import Core from './core'
import fs from 'fs'

import {
    IButton,
    ICommand,
    IListener,
    IModal,
    ISelector
} from './interface'

export function loadInteractions(client: Core) {
    const interactions: {
        buttons: Map<string, IButton>,
        commands: Map<string, ICommand>,
        modals: Map<string, IModal>,
        selectors: Map<string, ISelector>,
    } = {
        buttons: new Map(),
        commands: new Map(),
        modals: new Map(),
        selectors: new Map()
    }

    for (const interactionType of Object.keys(interactions)) {
        const basePath = `${__dirname}/../interactions/${interactionType}`

        try {
            for (const folderName of fs.readdirSync(basePath)) {
                for (const fileName of fs.readdirSync(basePath + `/${folderName}`)) {
                    const file = new (require(basePath + `/${folderName}/${fileName}`).default)()

                    interactions[interactionType].set(file.interactionName, file)
                }
            }
        } catch (error) { }
    }

    console.log(`Interactions were loaded!\nDetails:\n - buttons: ${interactions.buttons.size}\n - commands: ${interactions.commands.size}\n - modals: ${interactions.modals.size}\n - selectors: ${interactions.selectors.size}`)

    client.interactions = interactions
}

export function loadListeners(client: Core) {
    const basePath = `${__dirname}/../listeners`
    let listeners = {}

    try {
        for (const folderName of fs.readdirSync(basePath)) {
            for (const fileName of fs.readdirSync(basePath + `/${folderName}`)) {
                const file = new (require(basePath + `/${folderName}/${fileName}`).default)(client) as IListener

                client.on(file.listenerName, file.execute.bind(file, client)).setMaxListeners(0)

                const value = listeners[file.listenerName]

                if (value) {
                    listeners[file.listenerName] = value + 1
                } else {
                    listeners[file.listenerName] = 1
                }
            }
        }
    } catch (error) { }

    console.log(`Event listeners were loaded!\nDetails:\n${Object.keys(listeners).map((s) => ` - ${s}: ${listeners[s]}`).join(`\n`)}`)
}