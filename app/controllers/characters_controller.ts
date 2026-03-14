import Character from '#models/character'
import Game from '#models/game'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class CharactersController {

    // 🟢 PUBLIC: Anyone can view the list
    public async index({ view }: HttpContext) {
        const characters = await Character.query().preload('game')
        return view.render('pages/characters/index', { characters })
    }

    // 🟢 PUBLIC: Anyone can view a specific character
    public async show({ params, view }: HttpContext) {
        const character = await Character.findOrFail(params.id)
        await character.load('game')
        return view.render('pages/characters/show', { character })
    }

    // 🛡️ ADMIN ONLY: Show the form to create a character
    async create({ view, auth, response }: HttpContext) {
        if (auth.user!.role !== 'admin') {
            return response.unauthorized('Access Denied. You do not have the rights to add a character.')
        }

        const games = await Game.all() // We need this so the user can select a game from a dropdown!
        return view.render('pages/characters/create', { games })
    }

    // 🛡️ ADMIN ONLY: Actually save the new character to the database
    async store({ request, auth, response }: HttpContext) {
        if (auth.user!.role !== 'admin') {
            return response.unauthorized('Access Denied.')
        }

        const data = request.only(['name', 'gameId', 'affiliation', 'bio', 'isPlayable', 'imageUrl'])
        data.isPlayable = !!request.input('isPlayable') // Convert checkbox to boolean

        await Character.create(data) // Save to database

        return response.redirect('/characters')
    }

    // 🛡️ ADMIN ONLY: Show the form to edit a character
    public async edit({ params, view, auth, response }: HttpContext) {
        if (auth.user!.role !== 'admin') return response.unauthorized()

        const game = await Game.findOrFail(params.id)
        return view.render('pages/games/edit', { game })
    }

    // 🛡️ ADMIN ONLY: Actually update the character in the database
    public async update({ params, request, response, auth }: HttpContext) {
        if (auth.user!.role !== 'admin') return response.unauthorized()

        const game = await Game.findOrFail(params.id)
        const data = request.only(['title', 'era', 'description', 'releaseDate', 'imageUrl'])

        // Convert the date string back into a Luxon object
        if (data.releaseDate) {
            data.releaseDate = DateTime.fromISO(data.releaseDate)
        }

        game.merge(data)
        await game.save()

        return response.redirect().toRoute('games.show', { id: game.id })
    }
    // 🛡️ ADMIN ONLY: Delete the character
    public async destroy({ params, response, auth }: HttpContext) {
        if (auth.user!.role !== 'admin') {
            return response.unauthorized('Access Denied.')
        }

        const character = await Character.findOrFail(params.id)
        await character.delete()

        return response.redirect('/characters')
    }
}