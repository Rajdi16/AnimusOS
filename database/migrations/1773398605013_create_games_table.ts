import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games'



  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('era').notNullable()
      table.text('description').nullable()
      table.date('release_date').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('image_url').nullable()

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
