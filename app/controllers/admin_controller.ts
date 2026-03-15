import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Thread from '#models/thread'
import Post from '#models/post'
import Game from '#models/game'
import Character from '#models/character'

export default class AdminController {
    /**
     * 🖥️ DASHBOARD VIEW
     * Fetches all network metrics and recent initiates.
     */
    public async index({ view, auth, response }: HttpContext) {
        if (auth.user?.role !== 'admin') return response.redirect().toRoute('home')

        const users = await User.query().orderBy('id', 'desc')
        const threads = await Thread.query().preload('user').orderBy('createdAt', 'desc')
        const posts = await Post.all()
        const games = await Game.query().orderBy('id', 'desc')
        const characters = await Character.query().orderBy('id', 'desc')
        const recentUsers = await User.query().orderBy('createdAt', 'desc').limit(5)

        return view.render('pages/admin/dashboard', {
            users,
            threads,
            posts,
            games,
            characters,
            recentUsers,
        })
    }

    /**
     * 👤 USER MANAGEMENT: EDIT FORM
     */
    public async editUser({ params, view }: HttpContext) {
        const user = await User.findOrFail(params.id)
        return view.render('pages/profiles/edit', { user, isAdminEdit: true })
    }

    /**
     * 👤 USER MANAGEMENT: UPDATE DATA
     */
    public async updateUser({ params, request, response, session }: HttpContext) {
        const user = await User.findOrFail(params.id)

        // Admins can change Email and Role
        const data = request.only(['email', 'role'])

        // Only update password if a new one was provided
        const newPassword = request.input('password')
        if (newPassword && newPassword.length > 0) {
            user.password = newPassword
        }

        user.merge(data)
        await user.save()

        session.flash('success', `SYSTEM UPDATED: Genetic profile for ${user.username} is now synchronized.`)
        return response.redirect().toRoute('admin.dashboard')
    }

    /**
     * 🚫 USER MANAGEMENT: BAN/PURGE (The [BAN] Button)
     */
    public async destroyUser({ params, response, session }: HttpContext) {
        const user = await User.findOrFail(params.id)

        // Prevent Admins from deleting themselves!
        if (user.id === (await User.query().where('role', 'admin').first())?.id) {
            session.flash('error', 'CRITICAL ERROR: Cannot purge a Grand Master profile.')
            return response.redirect().back()
        }

        await user.delete()
        session.flash('success', `TERMINATED: Initiate ${user.username} has been purged from the network.`)
        return response.redirect().back()
    }

    /**
     * 🎮 ARCHIVE MANAGEMENT: PURGE RECORDS
     */
    public async destroyGame({ params, response, session }: HttpContext) {
        const game = await Game.findOrFail(params.id)
        await game.delete()
        session.flash('success', 'ARCHIVE REMOVED: Game record purged.')
        return response.redirect().back()
    }

    public async destroyCharacter({ params, response, session }: HttpContext) {
        const character = await Character.findOrFail(params.id)
        await character.delete()
        session.flash('success', 'ARCHIVE REMOVED: Persona record purged.')
        return response.redirect().back()
    }
}