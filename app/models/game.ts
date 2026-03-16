import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Character from '#models/character'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}