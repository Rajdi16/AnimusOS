import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {

  // Show Login Page
  async create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  // Handle Login
  async store({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.all()

    try {
      // If this succeeds, it moves to the next line
      const user = await User.verifyCredentials(email, password)

      // Start the session
      await auth.use('web').login(user)
      return response.redirect().toRoute('home')

    } catch (error) {
      // If verifyCredentials fails, it jumps down here
      session.flash('error', 'Access Denied. Invalid email or password.')
      return response.redirect().back()
    }
  }

  // Handle Logout
  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('session.create')
  }
}