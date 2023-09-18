import Core from '../../core/core'

import { IListener } from '../../core/interface'

import {
    AuditLogEvent,
    ClientEvents,
    Guild,
    GuildAuditLogsEntry,
    NonThreadGuildBasedChannel
} from 'discord.js'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class overwriteCreateListen implements IListener {
    public listenerName: keyof ClientEvents

    private minuteLimiter: MinuteLimiter
    private hourLimiter: HourLimiter

    constructor(client: Core) {
        this.listenerName = `guildAuditLogEntryCreate`

        this.minuteLimiter = new MinuteLimiter(client, `channelUpdate`)
        this.hourLimiter = new HourLimiter(client, `channelUpdate`)
    }

    public async execute(client: Core, logEntry: GuildAuditLogsEntry, guild: Guild): Promise<void> {
        if (guild.id !== "890304318643785769") return
        if (logEntry.action !== AuditLogEvent.ChannelOverwriteCreate) return

        if (logEntry.executor) {
            const target = logEntry.target as NonThreadGuildBasedChannel
            if (target.id === "1094624009213202432") return
            if (target.id === "1114499538561020027") return
            if (target.id === "1116290874129797181") return
            if (target.id === "1116290742005010474") return

            const backupAction = async () => {
                for (const change of logEntry.changes) {
                    if (change.key === `id`) {
                        await target.permissionOverwrites.delete(change.new as string)
                    }
                }
            }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}