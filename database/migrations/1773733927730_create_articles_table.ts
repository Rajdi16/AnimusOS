import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('excerpt').nullable()
      table.text('content').nullable()
      table.string('image_url').nullable()
      table.string('badge').nullable()
      table.string('badge_color').nullable() // e.g., 'danger', 'archived'
      table.timestamp('published_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}