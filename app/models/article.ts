import { ArticleSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Game from '#models/game'


export default class Article extends ArticleSchema {

    @column()
    declare id: number

    @column()
    declare title: string

    @column()
    declare excerpt: string

    @column()
    declare content: string

    @column()
    declare imageUrl: string

    @column.dateTime()
    declare publishedAt: DateTime

    @column()
    declare badge: string

    @column()
    declare badgeColor: string

    @column()
    declare gameId: number | null

    @belongsTo(() => Game)
    declare game: BelongsTo<typeof Game>



    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}