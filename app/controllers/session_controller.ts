import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {

  async create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.all()

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)
      return response.redirect().toRoute('home')

    } catch (error) {
      session.flash('error', 'Access Denied. Invalid email or password.')
      return response.redirect().back()
    }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('session.create')
  }
}