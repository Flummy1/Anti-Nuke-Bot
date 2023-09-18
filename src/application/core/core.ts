import SECRETS from './secrets'

import { Client, Guild, Partials, SlashCommandBuilder } from 'discord.js'
import { Connection, createConnection } from 'mongoose'

import {
    IButton,
    ICommand,
    IModal,
    ISelector
} from './interface'

import { loadInteractions, loadListeners } from './loaders'
import { setupErrorHandler, setupInteractionHandler } from './handlers'
import limiterRepository from '../../contexts/Limiter/LimiterRepository'

class Core extends Client {
    private _guild: Guild

    public database: Connection
    public repos: {
        limiter: limiterRepository
    }

    public interactions: {
        buttons: Map<string, IButton>,
        commands: Map<string, ICommand>,
        modals: Map<string, IModal>,
        selectors: Map<string, ISelector>,
    }

    constructor() {
        super({
            intents: 3145727,
            partials: [
                Partials.Message, Partials.Channel, Partials.User,
                Partials.GuildMember, Partials.Reaction
            ]
        })

        setupErrorHandler(this)

        this._guild = {} as Guild

        this.database = createConnection(SECRETS.MONGOURI)
        this.repos = {
            limiter: new limiterRepository(this)
        }

        this.interactions = {} as any

        loadInteractions(this)
        loadListeners(this)
    }

    public async getLastAuditLogEntry() {
        const auditLogs = await this.guild?.fetchAuditLogs({
            limit: 1
        })

        return auditLogs?.entries.first()
    }

    public async getMember(snowflake: string) {
        try {
            const guild = this.guild

            if (guild) {
                return guild.members.fetch(snowflake)
            } else {
                return null
            }
        } catch (error) {
            console.error('Error fetching member:', error)
            return null
        }
    }

    public async getChannel(snowflake: string) {
        try {
            const guild = this.guild

            if (guild) {
                return guild.channels.fetch(snowflake)
            } else {
                return null
            }
        } catch (error) {
            console.error('Error fetching channel:', error)
            return null
        }
    }

    public async getRole(snowflake: string) {
        try {
            const guild = this.guild

            if (guild) {
                return guild.roles.fetch(snowflake)
            } else {
                return null
            }
        } catch (error) {
            console.error('Error fetching role:', error)
            return null
        }
    }

    public async fetchGuild() {
        try {
            const guild = await this.guilds.fetch(SECRETS.IDLIST.GUILD)

            this._guild = guild

            return guild
        } catch (error) {
            console.error('Error fetching guild:', error)
            return null
        }
    }

    get guild() {
        if (!this._guild) {
            setImmediate(async () => {
                this._guild = await this.fetchGuild() as Guild
            })
        }

        return this._guild
    }

    public async init() {
        await this.login(SECRETS.TOKEN).then(async () => {
            console.log(`${this.user?.username} was logged in successfully!`)

            this._guild = await this.fetchGuild() as Guild

            const cmds: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">[] = []

            for (const [, cmd] of this.interactions.commands) {
                const builder = cmd.builder()

                cmds.push(builder)
            }

            await this._guild.commands.set(cmds)

            setupInteractionHandler(this)
        })
    }
}

export default Core