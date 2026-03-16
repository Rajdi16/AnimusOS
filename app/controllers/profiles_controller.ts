import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash' // 🛡️ Needed to verify passwords securely
import User from '#models/user'
export default class ProfilesController {

    public async show({ view, auth }: HttpContext) {
        // Fetch the user and preload their most recent activities
        const user = await User.query()
            .where('id', auth.user!.id)
            .preload('threads', (query) => query.orderBy('createdAt', 'desc').limit(5))
            .preload('posts', (query) => query.orderBy('createdAt', 'desc').limit(5))
            .firstOrFail()

        return view.render('pages/profile/show', { user })
    }

    // 🛡️ SECURITY: Password check view
    public async verifyPasswordView({ view }: HttpContext) {
        return view.render('pages/profile/verify_password')
    }

    // 🛡️ SECURITY: Verify password to grant access
    public async verifyPassword({ request, response, auth, session }: HttpContext) {
        const user = auth.user!
        const { password } = await request.validateUsing(
            vine.compile(
                vine.object({
                    password: vine.string()
                })
            )
        )

        const isPasswordValid = await hash.verify(user.password, password)

        if (!isPasswordValid) {
            session.flash('error', 'ACCESS DENIED: Invalid synchronization key.')
            return response.redirect().back()
        }

        // Grant access by setting a session flag
        session.put('can_edit_profile', true)
        return response.redirect().toRoute('profile.edit')
    }

    public async edit({ view, response, session }: HttpContext) {
        // Enforce the access flag
        if (!session.get('can_edit_profile')) {
            return response.redirect().toRoute('profile.verify_password')
        }

        return view.render('pages/profile/edit')
    }

    public async update({ request, response, auth, session }: HttpContext) {
        // (Keep existing update method, but remove flag after success)
        const user = auth.user!

        // 1. Get and Validate Data (Passwords are optional in case they only want to update email)
        const data = await request.validateUsing(
            vine.compile(
                vine.object({
                    username: vine.string().trim().minLength(3).maxLength(30),
                    full_name: vine.string().trim().maxLength(100).optional(),
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
                session.flash('error', 'SECURITY ALERT: Current password required to set a new one.')
                return response.redirect().back()
            }

            // Verify the old password matches what is currently in the database
            const isPasswordValid = await hash.verify(user.password, data.current_password)

            if (!isPasswordValid) {
                session.flash('error', 'ACCESS DENIED: Current password is incorrect.')
                return response.redirect().back()
            }

            // If it matches, update to the new password
            user.password = data.password
        }

        // 3. Merge Data and Save
        user.username = data.username
        user.fullName = data.full_name || null // fallback
        user.email = data.email
        await user.save()

        // 4. Success Feedback
        session.forget('can_edit_profile') // Revoke access
        session.flash('success', 'PROFILE UPDATED: Your settings have been saved.')
        return response.redirect().toRoute('profile.show')
    }

    // 🛡️ THE PURGE PROTOCOL (Delete Account)
    public async destroy({ request, auth, response, session }: HttpContext) {
        const user = auth.user!
        
        // Require password to delete
        const { current_password } = await request.validateUsing(
             vine.compile(
                 vine.object({
                     current_password: vine.string()
                 })
             )
         )

         const isPasswordValid = await hash.verify(user.password, current_password)

         if (!isPasswordValid) {
             session.flash('error', 'ACCESS DENIED: Invalid password. Deletion aborted.')
             return response.redirect().back()
         }

        await user.delete()

        session.flash('error', 'ACCOUNT DELETED: Your account has been permanently removed.')
        return response.redirect().toRoute('home')
    }
}