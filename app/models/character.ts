import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Game from '#models/game'

export default class Character extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare gameId: number

    @column()
    declare affiliation: string

    @column()
    declare bio: string

    @column()
    declare isPlayable: boolean
    @column()
    declare imageUrl: string | null

    @column()
    declare bannerImageUrl: string | null

    @belongsTo(() => Game)
    declare game: BelongsTo<typeof Game>



    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}