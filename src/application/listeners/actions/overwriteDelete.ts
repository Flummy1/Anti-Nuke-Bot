import Core from '../../core/core'

import { IListener } from '../../core/interface'

import {
    AuditLogEvent,
    ClientEvents,
    Guild,
    GuildAuditLogsEntry,
    NonThreadGuildBasedChannel,
    PermissionFlagsBits
} from 'discord.js'

import MinuteLimiter from '../../../contexts/Limiter/!MinuteLimiter'
import HourLimiter from '../../../contexts/Limiter/!HourLimiter'

export default class overwriteDeleteListen implements IListener {
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
        if (logEntry.action !== AuditLogEvent.ChannelOverwriteDelete) return

        if (logEntry.executor) {
            const target = logEntry.target as NonThreadGuildBasedChannel
            if (target.id === "1094624009213202432") return
            if (target.id === "1114499538561020027") return
            if (target.id === "1116290874129797181") return
            if (target.id === "1116290742005010474") return

            const backupAction = async () => {
                let overwriteData: {
                    id: string,
                    allow: number,
                    deny: number,
                    type: number
                } = {} as any

                for (const change of logEntry.changes) {
                    if (change.key === `id`) {
                        overwriteData.id = change.old as string
                    } else if (change.key === `allow`) {
                        overwriteData.allow = change.old as number
                    } else if (change.key === `deny`) {
                        overwriteData.deny = change.old as number
                    } else if (change.key === `type`) {
                        overwriteData.type = change.old as number
                    }
                }

                const allowBigInt = BigInt(overwriteData.allow || 0);
                const denyBigInt = BigInt(overwriteData.deny || 0);

                const allowPermissions = convertBigIntToPermissionFlagsBits(allowBigInt, true);
                const denyPermissions = convertBigIntToPermissionFlagsBits(denyBigInt, false);

                const mergedPermissions = { ...allowPermissions, ...denyPermissions };

                await target.permissionOverwrites.create(overwriteData.id, mergedPermissions, { type: overwriteData.type })
            }

            this.minuteLimiter.applyAction(logEntry.executor.id, backupAction)
            this.hourLimiter.applyAction(logEntry.executor.id, backupAction)
        }
    }
}

function convertBigIntToPermissionFlagsBits(value: bigint, allow: boolean) {
    const permissionKeys = Object.keys(PermissionFlagsBits);

    return permissionKeys.reduce((result, key) => {
        const permissionValue = PermissionFlagsBits[key];
        const hasPermission = (value & permissionValue) === permissionValue;

        result[key] = hasPermission ? allow : null;

        return result;
    }, {});
}