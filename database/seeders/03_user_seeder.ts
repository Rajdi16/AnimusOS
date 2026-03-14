import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
    async run() {
        await User.updateOrCreate(
            { username: 'admin' },
            {
                email: 'a@a.com',
                password: 'password'
            }
        )   
    }
}