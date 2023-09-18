import Core from './core'

import {
    ButtonBuilder,
    ButtonInteraction,
    ModalBuilder,
    ModalSubmitInteraction,
    ClientEvents,
    SlashCommandBuilder,
    CommandInteraction,
    AnySelectMenuInteraction,
    BaseSelectMenuBuilder,
    APISelectMenuComponent
} from 'discord.js'


export interface IButton {
    interactionName: string
    builder(...args: any[]): ButtonBuilder
    execute(client: Core, i: ButtonInteraction): Promise<any>
}

export interface ICommand {
    interactionName: string
    builder(...args: any[]): Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    execute(client: Core, i: CommandInteraction): Promise<any>
}

export interface IModal {
    interactionName: string
    builder(...args: any[]): ModalBuilder
    execute(client: Core, i: ModalSubmitInteraction): Promise<any>
}

export interface ISelector {
    interactionName: string
    builder(...args: any[]): BaseSelectMenuBuilder<APISelectMenuComponent>
    execute(client: Core, i: AnySelectMenuInteraction): Promise<any>
}

export interface IListener {
    listenerName: keyof ClientEvents
    execute(client: Core, ...args: any[]): Promise<any>
}