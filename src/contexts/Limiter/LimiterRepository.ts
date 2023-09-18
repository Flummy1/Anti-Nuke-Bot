import Core from '../../application/core/core'
import limiterProfileSchema, { IlimiterProfile } from './LimiterProfileSchema'
import { roles } from './LimitsMap'

import { GuildMember } from 'discord.js'
import { Model } from 'mongoose'

export default class limiterRepository {
    public client: Core
    private model: Model<IlimiterProfile>

    constructor(client: Core) {
        this.client = client
        this.model = this.client.database.model(`limiterProfile`, limiterProfileSchema)
    }

    private create(targetId: string) {
        return this.model.create({ userId: targetId })
    }

    private read(targetId: string) {
        return this.model.findOne({ userId: targetId })
    }

    public async get(targetId: string) {
        return await this.read(targetId) ?? await this.create(targetId)
    }

    public async applyQuarantine(target: GuildMember) {
        const userProfile = await this.get(target.id)

        userProfile.warnCount = 0
        userProfile.inQuarantine = true

        const savedRoles = target.roles.cache.map(r => r.id).filter(rid => !Object.values(roles).includes(rid))
        userProfile.savedRoles = savedRoles

        await userProfile.save()
    }

    public async clearQuarantine(target: GuildMember) {
        const userProfile = await this.get(target.id)

        userProfile.inQuarantine = false

        await target.roles.set(userProfile.savedRoles)
        userProfile.savedRoles = []

        await userProfile.save()
    }

    public async applyWarn(target: GuildMember) {
        const userProfile = await this.get(target.id)

        userProfile.warnCount += 1

        await userProfile.save()
    }
}