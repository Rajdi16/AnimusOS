import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Character from '#models/character'
import Article from '#models/article'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare era: string

  @column()
  declare description: string | null

  @column()
  declare imageUrl: string | null

  @column()
  declare bannerImageUrl: string | null

  @column()
  declare historicalYear: number | null

  @column.date({ columnName: 'release_date' })
  declare releaseDate: DateTime | null

  @column()
  declare platforms: string | null

  @column()
  declare developer: string | null

  @column()
  declare publisher: string | null

  @hasMany(() => Character)
  declare characters: HasMany<typeof Character>

  @hasMany(() => Article)
  declare articles: HasMany<typeof Article>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}