import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('title').notNullable()
      table.string('author').notNullable()
      table.integer('published_year').notNullable()
      table.string('genre').notNullable()
      table.text('summary').notNullable()
      table.string('isbn', 250).unique() // or table.string('isbn').notNullable().unique()      table.string('cover_image_url').nullable()
      table.boolean('is_available').notNullable().defaultTo(true)
      table.integer('number_of_pages').notNullable()
      table.string('language').notNullable()
      table.string('publisher').notNullable()
      table.string('cover_image_url').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}