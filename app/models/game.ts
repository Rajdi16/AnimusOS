import { GameSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'

export default class Game extends GameSchema {
  @column({ isprimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare era: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
