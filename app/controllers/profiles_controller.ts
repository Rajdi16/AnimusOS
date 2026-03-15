import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash' // 🛡️ Needed to verify passwords securely
import User from '#models/user'
export default class ProfilesController {

    public async edit({ view }: HttpContext) {
        return view.render('pages/profile/edit')
    }
    public async show({ view, auth }: HttpContext) {
        // Fetch the user and preload their most recent activities
        const user = await User.query()
            .where('id', auth.user!.id)
            .preload('threads', (query) => query.orderBy('createdAt', 'desc').limit(5))
            .preload('posts', (query) => query.orderBy('createdAt', 'desc').limit(5))
            .firstOrFail()

        return view.render('pages/profile/show', { user })
    }
    public async update({ request, response, auth, session }: HttpContext) {
        const user = auth.user!

        // 1. Get and Validate Data (Passwords are optional in case they only want to update email)
        const data = await request.validateUsing(
            vine.compile(
                vine.object({
                    email: vine.string().email().trim(),
                    current_password: vine.string().optional(),
                    password: vine.string().minLength(8).optional(),
                })
            )
        )

        // 2. Password Security Protocol
        if (data.password) {
            // Check if they actually provided their old password
            if (!data.current_password) {
                session.flash('error', 'SECURITY ALERT: Current key required to set a new one.')
                return response.redirect().back()
            }

            // Verify the old password matches what is currently in the database
            const isPasswordValid = await hash.verify(user.password, data.current_password)

            if (!isPasswordValid) {
                session.flash('error', 'ACCESS DENIED: Current synchronization key is incorrect.')
                return response.redirect().back()
            }

            // If it matches, update to the new password
            user.password = data.password
        }

        // 3. Merge Email and Save
        user.email = data.email
        await user.save()

        // 4. Success Feedback
        session.flash('success', 'SYNCHRONIZATION COMPLETE: Genetic markers updated.')
        return response.redirect().back()
    }

    // 🛡️ THE PURGE PROTOCOL (Delete Account)
    public async destroy({ auth, response, session }: HttpContext) {
        const user = auth.user!
        await user.delete()

        session.flash('error', 'DATA ERASED: Your presence has been scrubbed from the Animus.')
        return response.redirect().toRoute('home')
    }
}