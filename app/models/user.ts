import Thread from '#models/thread'
import Post from '#models/post'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {

  static async verifyCredentials(email: string, passwordPlain: string) {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await hash.verify(user.password, passwordPlain)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    return user
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare role: string

  @column({ columnName: 'full_name' })
  declare fullName: string | null

  @column({ serializeAs: null })
  declare password: string

  @hasMany(() => Thread)
  declare threads: HasMany<typeof Thread>

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}