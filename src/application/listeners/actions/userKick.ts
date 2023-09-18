import Core from '../../core/core'

import { AuditLogEvent, ClientEvents, Guild, GuildAuditLogsEntry, GuildBan } from 'discord.js'
import { IListener } from '../../core/interface'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class ChannelCreateListener implements IListener {
    public listenerName: keyof ClientEvents

    private minuteLimiter: MinuteLimiter
    private hourLimiter: HourLimiter

    constructor(client: Core) {
        this.listenerName = `guildAuditLogEntryCreate`

        this.minuteLimiter = new MinuteLimiter(client, `userKick`)
        this.hourLimiter = new HourLimiter(client, `userKick`)
    }

    public async execute(client: Core, logEntry: GuildAuditLogsEntry, guild: Guild): Promise<void> {
        if (guild.id !== "890304318643785769") return
        if (logEntry.action !== AuditLogEvent.MemberKick) return

        if (logEntry.executor) {
            const target = logEntry.target as GuildBan

            const backupAction = async () => { }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}