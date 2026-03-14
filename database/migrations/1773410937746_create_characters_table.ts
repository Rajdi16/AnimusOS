import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'characters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()

      // THIS IS THE CRUCIAL MISSING WIRE!
      table.integer('game_id').unsigned().references('id').inTable('games').onDelete('CASCADE')
      table.string('affiliation')
      table.text('bio')
      table.boolean('is_playable').defaultTo(false)
      table.string('image_url').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}