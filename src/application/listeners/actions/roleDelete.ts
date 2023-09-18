import Core from '../../core/core'

import { AuditLogEvent, ClientEvents, Guild, GuildAuditLogsEntry, Role } from 'discord.js'
import { IListener } from '../../core/interface'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class ChannelCreateListener implements IListener {
    public listenerName: keyof ClientEvents

    private minuteLimiter: MinuteLimiter
    private hourLimiter: HourLimiter

    constructor(client: Core) {
        this.listenerName = `guildAuditLogEntryCreate`

        this.minuteLimiter = new MinuteLimiter(client, `roleDelete`)
        this.hourLimiter = new HourLimiter(client, `roleDelete`)
    }

    public async execute(client: Core, logEntry: GuildAuditLogsEntry, guild: Guild): Promise<void> {
        if (guild.id !== "890304318643785769") return
        if (logEntry.action !== AuditLogEvent.RoleDelete) return

        if (logEntry.executor) {
            const target = logEntry.target as Role

            const backupAction = async () => {
                await restoreDeletedRole(target)
            }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}

async function restoreDeletedRole(role: Role): Promise<Role | null> {
    try {
        const newRole = await role.guild.roles.create({
            name: role.name,
            permissions: role.permissions || new Permissions(),
            color: role.color,
            hoist: role.hoist,
            mentionable: role.mentionable
        })

        return newRole
    } catch (error) {
        console.error('Failed to restore deleted role:', error)
        return null
    }
}