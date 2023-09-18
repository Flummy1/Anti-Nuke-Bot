import Core from '../../core/core'

import { AuditLogChange, AuditLogEvent, ClientEvents, Guild, GuildAuditLogsEntry, Role, RoleEditOptions } from 'discord.js'
import { IListener } from '../../core/interface'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class ChannelCreateListener implements IListener {
    public listenerName: keyof ClientEvents

    private minuteLimiter: MinuteLimiter
    private hourLimiter: HourLimiter

    constructor(client: Core) {
        this.listenerName = `guildAuditLogEntryCreate`

        this.minuteLimiter = new MinuteLimiter(client, `roleUpdate`)
        this.hourLimiter = new HourLimiter(client, `roleUpdate`)
    }

    public async execute(client: Core, logEntry: GuildAuditLogsEntry, guild: Guild): Promise<void> {
        if (guild.id !== "890304318643785769") return
        if (logEntry.action !== AuditLogEvent.RoleUpdate) return

        if (logEntry.executor) {
            const target = logEntry.target as Role

            const backupAction = async () => {
                await compareAndRestoreRole(target, logEntry.changes)
            }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}

async function compareAndRestoreRole(target: Role, changes: AuditLogChange[]) {
    const restoreData: RoleEditOptions = {}

    for (const change of changes) {
        if (change.key === `mentionable`) {
            restoreData.mentionable = change.old as boolean
        } else if (change.key === `hoist`) {
            restoreData.hoist = change.old as boolean
        } else if (change.key === `permissions`) {
            restoreData.permissions = change.old as any
        } else if (change.key === `color`) {
            restoreData.color = change.old as number
        } else if (change.key === `name`) {
            restoreData.name = change.old as string
        } else if (change.key === `icon_hash`) {
            restoreData.icon = change.old as string
        }
    }

    await target.edit(restoreData)
}