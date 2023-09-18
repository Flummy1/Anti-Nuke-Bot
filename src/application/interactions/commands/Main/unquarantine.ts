import Core from '../../../core/core';

import { CacheType, CommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import { ICommand } from '../../../core/interface';
import { roles } from '../../../../contexts/Limiter/LimitsMap';

export default class unquarantineCommand implements ICommand {
    public interactionName: string

    constructor() {
        this.interactionName = `unquarantine`
    }

    builder(): Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
        const builder = new SlashCommandBuilder()
            .setName(this.interactionName)
            .setDescription(`Снять карантин с пользователя`)
            .addUserOption(o => {
                o.setName(`пользователь`)
                o.setDescription(`Необходимый пользователь`)

                return o
            })

        return builder
    }

    async execute(client: Core, i: CommandInteraction<CacheType>): Promise<any> {
        await i.deferReply({ ephemeral: true })

        const { options, user: executor } = i
        const member = i.member as GuildMember

        if (!member.roles.cache.has(`1087182852132704316`) && member.id !== `761328887254089748`) {
            return await i.editReply({
                content: `Вы не можете использовать эту команду!`
            })
        }

        const targetUser = options.get(`пользователь`)?.user
        if (!targetUser || targetUser.bot || targetUser.id === executor.id) {
            return await i.editReply({
                content: `Вы указали некоректного пользователя!`
            })
        }

        const targetMember = await client.getMember(targetUser.id)
        if (!targetMember) {
            return await i.editReply({
                content: `Указанный вами пользователь не находится на сервере!`
            })
        }

        const targetUserProfile = await client.repos.limiter.get(targetUser.id)
        if (!targetUserProfile.inQuarantine) {
            return await i.editReply({
                content: `Указанный вами пользователь не находится в карантине!`
            })
        }

        await targetMember.roles.set(targetUserProfile.savedRoles)
        await client.repos.limiter.clearQuarantine(targetMember)

        return await i.editReply({
            content: `Карантин успешно был снят с пользователя ${targetMember}!`
        })
    }
}