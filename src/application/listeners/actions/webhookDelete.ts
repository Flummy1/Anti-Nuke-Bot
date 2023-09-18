import Core from '../../core/core'

import { AuditLogEvent, ClientEvents, Guild, GuildAuditLogsEntry, Webhook } from 'discord.js'
import { IListener } from '../../core/interface'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class ChannelCreateListener implements IListener {
    public listenerName: keyof ClientEvents

    private minuteLimiter: MinuteLimiter
    private hourLimiter: HourLimiter

    constructor(client: Core) {
        this.listenerName = `guildAuditLogEntryCreate`

        this.minuteLimiter = new MinuteLimiter(client, `webhookDelete`)
        this.hourLimiter = new HourLimiter(client, `webhookDelete`)
    }

    public async execute(client: Core, logEntry: GuildAuditLogsEntry, guild: Guild): Promise<void> {
        if (guild.id !== "890304318643785769") return
        if (logEntry.action !== AuditLogEvent.WebhookDelete) return

        if (logEntry.executor) {
            const target = logEntry.target as Webhook

            const backupAction = async () => {
                await restoreDeletedWebhook(target)
            }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}

async function restoreDeletedWebhook(webhook: Webhook): Promise<Webhook | null> {
    try {
        const newWebhook = await webhook.channel?.createWebhook({
            name: webhook.name,
            avatar: webhook.avatar
        }) as Webhook

        return newWebhook
    } catch (error) {
        console.error('Failed to restore deleted role:', error)
        return null
    }
}