import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'
import env from '#start/env' // <-- Added this so it can read your .env file!

const dbConfig = defineConfig({
  /**
   * We are forcing the Animus to use MySQL now!
   */
  connection: 'mysql',

  prettyPrintDebugQueries: true,

  connections: {
    /**
     * SQLite connection (Kept just in case, but no longer the default)
     */
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      debug: app.inDev,
    },

    /**
     * MySQL / MariaDB connection (UNCOMMENTED AND ACTIVE!)
     */
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      debug: app.inDev,
    },
  },
})

export default dbConfig