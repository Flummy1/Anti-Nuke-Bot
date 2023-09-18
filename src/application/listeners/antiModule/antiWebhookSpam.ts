import Core from '../../core/core'

import { ClientEvents, Message } from 'discord.js'
import { IListener } from '../../core/interface'

interface IHookData {
    isDeleting: boolean,
    storage: Message[]
}

export default class ChannelCreateListener implements IListener {
    public listenerName: keyof ClientEvents
    private limiter: Map<string, IHookData>

    constructor(client: Core) {
        this.listenerName = `messageCreate`
        this.limiter = new Map()
    }

    public async execute(client: Core, message: Message): Promise<void> {
        const { webhookId } = message
        if (!webhookId) return

        let webhookData = this.limiter.get(webhookId)

        if (webhookData) {
            const array = webhookData.storage
            array.push(message)

            this.limiter.set(webhookId, {
                isDeleting: webhookData.isDeleting,
                storage: array,
            })
        } else {
            this.limiter.set(webhookId, {
                isDeleting: false,
                storage: [message],
            })

            setTimeout(() => {
                this.limiter.delete(webhookId)
            }, 60000)
        }

        webhookData = this.limiter.get(webhookId)

        if (webhookData && !webhookData.isDeleting && webhookData.storage.length >= 5) {
            this.limiter.set(webhookId, {
                isDeleting: true,
                storage: webhookData.storage,
            })

            const hook = await message.fetchWebhook()
            await hook.delete().catch(() => { })

            while (webhookData.storage.length > 0) {
                const message = webhookData.storage.pop()
                if (!message) continue

                await message.delete().catch(() => { })

                this.limiter.set(webhookId, {
                    isDeleting: true,
                    storage: webhookData.storage,
                })

                webhookData = this.limiter.get(webhookId)
                if (!webhookData) break
            }
        }
    }
}