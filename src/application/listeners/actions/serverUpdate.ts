import Core from '../../core/core'

import { AuditLogChange, ClientEvents, Guild, GuildAuditLogsEntry, GuildEditOptions, AuditLogEvent, Locale, GuildVerificationLevel } from 'discord.js'
import { IListener } from '../../core/interface'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class ChannelCreateListener implements IListener {
    public listenerName: keyof ClientEvents

    private minuteLimiter: MinuteLimiter
    private hourLimiter: HourLimiter

    constructor(client: Core) {
        this.listenerName = `guildAuditLogEntryCreate`

        this.minuteLimiter = new MinuteLimiter(client, `serverUpdate`)
        this.hourLimiter = new HourLimiter(client, `serverUpdate`)
    }

    public async execute(client: Core, logEntry: GuildAuditLogsEntry, guild: Guild): Promise<void> {
        if (guild.id !== "890304318643785769") return
        if (logEntry.action !== AuditLogEvent.GuildUpdate) return

        if (logEntry.executor) {
            const target = logEntry.target as Guild

            const backupAction = async () => {
                await restoreGuildUpdates(target, logEntry.changes)
            }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}

async function restoreGuildUpdates(target: Guild, changes: AuditLogChange[]): Promise<void> {
    const restoreData: GuildEditOptions = {}

    for (const change of changes) {
        if (change.key === `afk_channel_id`) {
            restoreData.afkChannel = change.old as string
        } else if (change.key === `default_message_notifications`) {
            restoreData.defaultMessageNotifications = change.old as number
        } else if (change.key === `name`) {
            restoreData.name = change.old as string
        } else if (change.key === `afk_timeout`) {
            restoreData.afkTimeout = change.old as number
        } else if (change.key === `system_channel_flags` as any) {
            restoreData.systemChannelFlags = change.old as number
        } else if (change.key === `system_channel_id`) {
            restoreData.systemChannel = change.old as string
        } else if (change.key === `premium_progress_bar_enabled` as any) {
            restoreData.premiumProgressBarEnabled = change.old as boolean
        } else if (change.key === `banner_hash`) {
            restoreData.banner = change.old as string
        } else if (change.key === `icon_hash`) {
            restoreData.icon = change.old as string
        } else if (change.key === `splash_hash`) {
            restoreData.splash = change.old as string
        } else if (change.key === `rules_channel_id`) {
            restoreData.rulesChannel = change.old as string
        } else if (change.key === `public_updates_channel_id`) {
            restoreData.publicUpdatesChannel = change.old as string
        } else if (change.key === `preferred_locale`) {
            restoreData.preferredLocale = change.old as Locale
        } else if (change.key === `description`) {
            restoreData.description = change.old as string
        } else if (change.key === `discovery_splash_hash`) {
            restoreData.discoverySplash = change.old as string
        } else if (change.key === `verification_level`) {
            restoreData.verificationLevel = change.old as GuildVerificationLevel
        }
    }

    await target.edit(restoreData)
}