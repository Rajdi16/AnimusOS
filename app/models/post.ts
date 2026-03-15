import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Thread from '#models/thread'

export default class Post extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare body: string

    @column()
    declare userId: number

    @column()
    declare threadId: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>

    @belongsTo(() => Thread)
    declare thread: BelongsTo<typeof Thread>
}