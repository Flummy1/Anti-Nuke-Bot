import Core from './core'
import SECRETS from './secrets'

import {
    AnySelectMenuInteraction,
    ButtonInteraction,
    CommandInteraction,
    ModalSubmitInteraction
} from 'discord.js'

import {
    IButton,
    ICommand,
    IModal,
    ISelector
} from './interface'

export function setupErrorHandler(client: Core) {
    const sendErrorToDM = async (error: Error) => {
        const user = await client.getMember(SECRETS.IDLIST.OWNER)

        if (user) {
            user.send(`An error occurred:\n\`\`\`${error}\n${error.stack}\`\`\``)
                .catch(console.error)
        } else {
            console.error(`Unable to find user with ID: ${SECRETS.IDLIST.OWNER}`)
        }
    }

    client.on('error', async (error) => {
        await sendErrorToDM(error)
    })

    process.on('uncaughtException', async (error) => {
        await sendErrorToDM(error)
    })

    process.on('unhandledRejection', async (reason, promise) => {
        console.log(reason, promise)
    })
}

export function setupInteractionHandler(client: Core) {
    const { commands, buttons, selectors, modals } = client.interactions

    client.on(`interactionCreate`, async (i) => {
        if (!i.isCommand()) return

        const isCommandExits = commands.has(i.commandName)
        if (!isCommandExits) return

        const command = commands.get(i.commandName) as ICommand
        await command.execute(client, i as CommandInteraction)
    })

    client.on(`interactionCreate`, async (i) => {
        if (!i.isModalSubmit()) return

        const customId = i.customId.split(`.`)[0]

        const isModalExits = modals.has(customId)
        if (!isModalExits) return

        const modal = modals.get(customId) as IModal
        await modal.execute(client, i as ModalSubmitInteraction)
    })

    client.on(`interactionCreate`, async (i) => {
        if (!i.isButton()) return

        const customId = i.customId.split(`.`)[0]

        const isButtonExits = buttons.has(customId)
        if (!isButtonExits) return

        const button = buttons.get(customId) as IButton
        await button.execute(client, i as ButtonInteraction)
    })

    client.on(`interactionCreate`, async (i) => {
        if (!i.isAnySelectMenu()) return

        const customId = i.customId.split(`.`)[0]

        const isSelectorExits = selectors.has(customId)
        if (!isSelectorExits) return

        const selector = selectors.get(customId) as ISelector
        await selector.execute(client, i as AnySelectMenuInteraction)
    })
}