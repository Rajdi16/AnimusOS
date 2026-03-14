import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    /**
     * Show the registration form
     */
    async registerView({ view }: HttpContext) {
        return view.render('pages/auth/register')
    }

    /**
     * Handle the registration logic
     */
    async register({ request, response, auth, session }: HttpContext) {
        // 1. Gather the data from the form
        const { email, username, password, fullName } = request.all()

        // 2. UNIQUE CHECK: Search for existing identity in the database
        // We check both the email AND the username (codename)
        const existingUser = await User.query()
            .where('email', email)
            .orWhere('username', username)
            .first()

        if (existingUser) {
            // If we find someone, we stop the process
            session.flash('errors', 'This email or username is already registered in the Animus.')

            // We also flash the old data (except password) so the user doesn't have to re-type it
            session.flashAll()

            return response.redirect().back()
        }

        // 3. CREATE: Everything is clear, forge the new identity
        try {
            const user = await User.create({
                email,
                username,
                password,
                fullName,
                role: 'user', // Explicitly setting them as a standard user
            })

            // 4. LOGIN: Automatically log them in so they don't have to do it manually
            await auth.use('web').login(user)

            // 5. REDIRECT: Send them to the main Dashboard (Home)
            return response.redirect().toRoute('home')

        } catch (error) {
            // Fallback for unexpected database errors
            session.flash('errors', 'An error occurred during synchronization. Please try again.')
            return response.redirect().back()
        }
    }

    /**
     * Show the login form
     */
    async loginView({ view }: HttpContext) {
        return view.render('pages/auth/login')
    }

    /**
     * Handle the login handshake
     */
    async login({ request, response, auth, session }: HttpContext) {
        const { email, password } = request.all()

        try {
            // Verify the credentials against the hashed password in the DB
            const user = await User.verifyCredentials(email, password)

            // Initialize the session
            await auth.use('web').login(user)

            return response.redirect().toRoute('home')
        } catch (error) {
            // Access Denied
            session.flash('errors', 'Invalid credentials. Access denied by Abstergo security.')
            return response.redirect().back()
        }
    }

    /**
     * Terminate the session
     */
    async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.redirect().toRoute('session.create')
    }
}