import Core from '../../application/core/core'

import { EmbedBuilder, GuildMember, TextChannel } from 'discord.js'
import { hourLimits, roles } from './LimitsMap'
import limiterRepository from './LimiterRepository'

interface userActionData {
    actionsCount: number
    backupList: (() => Promise<void>)[]
}

const quarantineRoleId = "1102597291203895326"
const serverBoostRoleId = "890469731285483541"
const integrationRoleId = "1071060303267250276"

export default class HourLimiter {
    private client: Core
    private repository: limiterRepository
    private actionName: keyof typeof hourLimits
    private actions: Map<string, userActionData>

    constructor(core: Core, actionName: keyof typeof hourLimits) {
        this.client = core
        this.repository = core.repos.limiter
        this.actionName = actionName
        this.actions = new Map()
    }

    public async applyAction(targetId: string, backupAction: () => Promise<void>) {
        if (targetId === this.client.user?.id) return

        const target = await this.client.getMember(targetId)
        if (!target) return
        if (target.roles.cache.hasAny(...[roles[1], roles[2], roles[3]])) return

        let userActionsData: userActionData | undefined = undefined

        const isUserDataExist = this.actions.has(targetId)

        if (isUserDataExist) {
            userActionsData = this.actions.get(targetId)

            if (!userActionsData) {
                userActionsData = this.createActionsData(targetId, backupAction)
            } else {
                userActionsData.actionsCount += 1
                userActionsData.backupList.push(backupAction)

                this.actions.set(targetId, userActionsData)
            }
        } else {
            userActionsData = this.createActionsData(targetId, backupAction)
        }

        const { actionsCount, backupList } = userActionsData
        const { limit, punishment } = this.getLimit(target)

        const embed = new EmbedBuilder()
            .setTimestamp().setColor(`#2cb18c`)
            .setTitle(`Запись о действии | Часовой интервал`)
            .setFields([
                {
                    name: "Тип действия",
                    inline: true,
                    value: `\`${this.actionName}\``
                },
                {
                    name: "Автор действия",
                    inline: true,
                    value: `<@${targetId}>`
                },
                {
                    name: "Кол-во действий",
                    value: `Cовершено \`${actionsCount}\` из \`${limit}\` допустимых`
                }
            ])

        const logGuild = await this.client.guilds.fetch(`1069599280853176401`)
        const logChannel = logGuild.channels.cache.get(`1131168219319783424`) as TextChannel

        await logChannel.send({ embeds: [embed] })

        if (actionsCount >= limit && limit !== 0) {
            await this.applyPunishment(target, punishment, backupList)
        }
    }

    private getLimit(target: GuildMember) {
        const limitTable = hourLimits[this.actionName]

        let userLimit: {
            limit: number
            punishment: string | null
        } = limitTable[roles.everyone]

        for (const roleId of Object.keys(limitTable)) {
            if (target.roles.cache.has(roleId)) {
                userLimit = limitTable[roleId]
            }
        }

        return userLimit
    }

    private createActionsData(targetId: string, backupAction: () => Promise<void>) {
        const userActionsData = { actionsCount: 1, backupList: [backupAction] }

        this.actions.set(targetId, userActionsData)

        setTimeout(() => {
            this.actions.delete(targetId)
        }, 60 * 60 * 1000)

        return userActionsData
    }

    private async applyPunishment(target: GuildMember, punishment: string | null, backupList: (() => Promise<void>)[]) {
        if (!target.roles.cache.hasAny(...[`1036607828552601621`, `1087182852132704316`])) {
            if (!punishment) return

            switch (punishment) {
                case "warn":
                    await this.applyWarn(target, backupList)
                    await this.executeBackup(backupList)

                    let embed1 = new EmbedBuilder()
                        .setTimestamp().setColor(`#da8c17`)
                        .setTitle(`Запись о варне`)
                        .setFields([
                            {
                                name: "Тип действия",
                                inline: true,
                                value: `\`${this.actionName}\``
                            },
                            {
                                name: "Нарушитель",
                                inline: true,
                                value: `${target}`
                            }
                        ])

                    let logGuild1 = await this.client.guilds.fetch(`1069599280853176401`)
                    let logChannel1 = logGuild1.channels.cache.get(`1131168219319783424`) as TextChannel

                    await logChannel1.send({ embeds: [embed1] })

                    break

                case "quarantine":
                    await this.applyQuarantine(target, backupList)
                    await this.executeBackup(backupList)

                    let embed = new EmbedBuilder()
                        .setTimestamp().setColor(`#da1717`)
                        .setTitle(`Запись о карантине`)
                        .setFields([
                            {
                                name: "Тип действия",
                                inline: true,
                                value: `\`${this.actionName}\``
                            },
                            {
                                name: "Нарушитель",
                                inline: true,
                                value: `${target}`
                            }
                        ])

                    let logGuild = await this.client.guilds.fetch(`1069599280853176401`)
                    let logChannel = logGuild.channels.cache.get(`1131168219319783424`) as TextChannel

                    await logChannel.send({ embeds: [embed] })

                    break
            }
        }

        this.actions.delete(target.id)
    }

    private async applyWarn(target: GuildMember, backupList: (() => Promise<void>)[]) {
        const userProfile = await this.repository.get(target.id)

        if (userProfile.warnCount >= 1) {
            await this.applyQuarantine(target, backupList)
        } else {
            await this.repository.applyWarn(target)
        }
    }

    private async applyQuarantine(target: GuildMember, backupList: (() => Promise<void>)[]) {
        const userProfile = await this.repository.get(target.id)

        if (userProfile.inQuarantine) return

        const rolesToSet = [quarantineRoleId]

        if (target.roles.cache.has(serverBoostRoleId)) {
            rolesToSet.push(serverBoostRoleId)
        }

        if (target.roles.cache.has(integrationRoleId)) {
            rolesToSet.push(integrationRoleId)
        }

        await this.repository.applyQuarantine(target)
        await target.roles.set(rolesToSet)
    }

    private async executeBackup(backupList: (() => Promise<void>)[]) {
        for (const action of backupList) {
            await action()
        }
    }
}