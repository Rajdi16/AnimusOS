import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Game from '#models/game' // Import the Game model!

export default class Character extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare gameId: number // The ID of the game they belong to

    @column()
    declare affiliation: string // e.g., 'Assassin', 'Templar', 'Isu'

    @column()
    declare bio: string // A short backstory for the character

    @column()
    declare isPlayable: boolean // true for Ezio, false for Leonardo da Vinci
    @column()
    declare imageUrl: string | null // Optional: URL to the character's image

    // -------------------------
    // RELATIONSHIPS
    // -------------------------

    // This is the Relationship! It links this Character directly to a Game.
    @belongsTo(() => Game)
    declare game: BelongsTo<typeof Game>

    // -------------------------

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime // Fixed the cut-off word!
}