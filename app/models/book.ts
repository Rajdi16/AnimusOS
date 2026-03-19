import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Game from '#models/game'


export default class Book extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare author: string

    @column()
    declare publishedYear: number

    @column()
    declare genre: string

    @column()
    declare summary: string

    @column()
    declare isbn: string

    @column()
    declare coverImageUrl: string | null

    @column()
    declare isAvailable: boolean

    @column()
    declare numberOfPages: number

    @column()
    declare language: string

    @column()
    declare publisher: string

    @column()
    declare gameId: number | null

    @belongsTo(() => Game)
    declare game: BelongsTo<typeof Game>

}