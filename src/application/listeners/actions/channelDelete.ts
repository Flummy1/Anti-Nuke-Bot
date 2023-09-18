import Core from '../../core/core'

import { AuditLogEvent, ClientEvents, Guild, GuildAuditLogsEntry, NonThreadGuildBasedChannel } from 'discord.js'
import { IListener } from '../../core/interface'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class ChannelDeleteListener implements IListener {
    public listenerName: keyof ClientEvents

    private minuteLimiter: MinuteLimiter
    private hourLimiter: HourLimiter

    constructor(client: Core) {
        this.listenerName = `guildAuditLogEntryCreate`

        this.minuteLimiter = new MinuteLimiter(client, `channelDelete`)
        this.hourLimiter = new HourLimiter(client, `channelDelete`)
    }

    public async execute(client: Core, logEntry: GuildAuditLogsEntry, guild: Guild): Promise<void> {
        if (guild.id !== "890304318643785769") return
        if (logEntry.action !== AuditLogEvent.ChannelDelete) return

        if (logEntry.executor) {
            const target = logEntry.target as NonThreadGuildBasedChannel

            const backupAction = async () => {
                const channel = client.channels.cache.get(target.id) as NonThreadGuildBasedChannel
                await channel.clone()
            }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}