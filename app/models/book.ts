import { BaseModel, column } from '@adonisjs/lucid/orm'


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

}