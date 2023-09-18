import Core from '../../core/core'

import { IListener } from '../../core/interface'

import {
    AuditLogChange,
    AuditLogEvent,
    ChannelType,
    ClientEvents,
    Emoji,
    Guild,
    GuildAuditLogsEntry,
    GuildChannelEditOptions,
    GuildForumTagData,
    NonThreadGuildBasedChannel
} from 'discord.js'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class ChannelUpdateListen implements IListener {
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
        if (logEntry.action !== AuditLogEvent.ChannelUpdate) return

        if (logEntry.executor) {
            const target = logEntry.target as NonThreadGuildBasedChannel
            if (target.id === "1094624009213202432") return

            const backupAction = async () => {
                await restoreChannelParams(target, logEntry.changes).catch(() => { })
            }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}

async function restoreChannelParams(channel: NonThreadGuildBasedChannel, changes: AuditLogChange[]) {
    const channelParams = {
        [ChannelType.GuildText]: ['default_auto_archive_duration', 'rate_limit_per_user', 'name', 'topic', 'nsfw'],
        [ChannelType.GuildVoice]: ['name', 'bitrate', 'video_quality_mode', 'rate_limit_per_user', 'nsfw', 'rtc_region', 'user_limit'],
        [ChannelType.GuildForum]: ['name', 'topic', 'default_auto_archive_duration', 'available_tags', 'default_thread_rate_limit_per_user', 'default_reaction_emoji'],
        [ChannelType.GuildAnnouncement]: ['topic', 'default_auto_archive_duration', 'rate_limit_per_user', 'nsfw', 'type', 'name'],
        [ChannelType.GuildStageVoice]: ['name', 'rtc_region', 'rate_limit_per_user', 'user_limit', 'bitrate', 'nsfw', 'video_quality_mode'],
        [ChannelType.GuildCategory]: ['name']
    }

    const allowedParams = channelParams[channel.type]
    if (!allowedParams) {
        console.log('Unsupported channel type: ' + channel.type)
        return
    }

    const editData: GuildChannelEditOptions = {}

    for (const change of changes) {
        if (allowedParams.includes(change.key)) {
            if (change.key === 'name') {
                editData.name = change.old as string
            } else if (change.key === 'bitrate') {
                editData.bitrate = change.old as number
            } else if (change.key === 'video_quality_mode' as any) {
                editData.videoQualityMode = change.old as number
            } else if (change.key === 'rate_limit_per_user') {
                editData.rateLimitPerUser = change.old as number
            } else if (change.key === 'nsfw') {
                editData.nsfw = change.old as boolean
            } else if (change.key === 'rtc_region' as any) {
                editData.rtcRegion = change.old as string
            } else if (change.key === 'user_limit') {
                editData.userLimit = change.old as number
            } else if (change.key === 'default_auto_archive_duration') {
                editData.defaultAutoArchiveDuration = change.old as number
            } else if (change.key === 'topic') {
                editData.topic = change.old as string
            } else if (change.key === 'available_tags' as any) {
                editData.availableTags = change.old as GuildForumTagData[]
            } else if (change.key === 'default_thread_rate_limit_per_user' as any) {
                editData.defaultThreadRateLimitPerUser = change.old as number
            } else if (change.key === 'default_reaction_emoji' as any) {
                editData.defaultReactionEmoji = change.old as Emoji
            }
        }
    }

    await channel.edit(editData)
}