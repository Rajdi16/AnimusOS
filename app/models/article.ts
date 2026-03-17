import { ArticleSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'


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



    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}