import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

    async registerView({ view }: HttpContext) {
        return view.render('pages/auth/register')
    }

    async register({ request, response, auth, session }: HttpContext) {
        const { email, username, password, fullName } = request.all()

        const existingUser = await User.query()
            .where('email', email)
            .orWhere('username', username)
            .first()

        if (existingUser) {
            session.flash('errors', 'This email or username is already registered in the Animus.')

            session.flashAll()

            return response.redirect().back()
        }

        try {
            const user = await User.create({
                email,
                username,
                password,
                fullName,
                role: 'user',
            })

            await auth.use('web').login(user)
            return response.redirect().toRoute('home')

        } catch (error) {
            session.flash('errors', 'An error occurred during synchronization. Please try again.')
            return response.redirect().back()
        }
    }

    async loginView({ view }: HttpContext) {
        return view.render('pages/auth/login')
    }

    async login({ request, response, auth, session }: HttpContext) {
        const { email, password } = request.all()

        try {
            const user = await User.verifyCredentials(email, password)

            await auth.use('web').login(user)

            return response.redirect().toRoute('home')
        } catch (error) {
            session.flash('errors', 'Invalid credentials. Access denied by Abstergo security.')
            return response.redirect().back()
        }
    }

    async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.redirect().toRoute('session.create')
    }
}