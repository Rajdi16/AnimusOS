import Game from '#models/game'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon' // 🛡️ Required for DNA-accurate date parsing

export default class GamesController {
    /**
     * 🟢 PUBLIC: Display a list of all games
     */
    public async index({ view }: HttpContext) {
        const games = await Game.query().preload('characters')
        return view.render('pages/games/index', { games })
    }

    /**
     * 🟢 PUBLIC: Display games in a chronological timeline
     */
    public async timeline({ request, view }: HttpContext) {
        const sortMode = request.input('sort', 'release')

        // Fetch games ordered by either historical year or release date
        const query = Game.query()
        if (sortMode === 'historical') {
            // Sort NULLs to the bottom, then sort correctly by era
            query.orderByRaw('CASE WHEN historical_year IS NULL THEN 1 ELSE 0 END ASC, historical_year ASC')
        } else {
            query.orderBy('release_date', 'asc')
        }
        
        const games = await query
        
        return view.render('pages/games/timeline', { games, sortMode })
    }

    /**
     * 🟢 PUBLIC: Display a single game's details
     */
    public async show({ params, view }: HttpContext) {
        const game = await Game.query()
            .where('id', params.id)
            .preload('characters')
            .firstOrFail()

        return view.render('pages/games/show', { game })
    }

    /**
     * 🛡️ ADMIN ONLY: Form to create a new game
     */
    public async create({ view, auth, response }: HttpContext) {
        if (auth.user!.role !== 'admin') {
            return response.unauthorized('Access Denied. Admin clearance required.')
        }
        return view.render('pages/games/create')
    }

    /**
     * 🛡️ ADMIN ONLY: Handle store
     */
    public async store({ request, auth, response }: HttpContext) {
        if (auth.user!.role !== 'admin') return response.unauthorized()

        const data = request.only(['title', 'era', 'description', 'releaseDate', 'imageUrl', 'bannerImageUrl', 'historicalYear', 'platforms', 'developer', 'publisher'])

        // 🧬 DNA FIX: Convert string to Luxon object
        if (data.releaseDate) {
            data.releaseDate = DateTime.fromISO(data.releaseDate)
        }
        
        if (data.historicalYear === '') {
            data.historicalYear = null
        }

        const game = await Game.create(data)
        return response.redirect(`/games/${game.id}`)
    }

    /**
     * 🛡️ ADMIN ONLY: Form to edit
     */
    public async edit({ params, view, auth, response }: HttpContext) {
        if (auth.user!.role !== 'admin') return response.unauthorized()

        const game = await Game.findOrFail(params.id)
        return view.render('pages/games/edit', { game })
    }

    /**
     * 🛡️ ADMIN ONLY: Handle update
     */
    public async update({ params, request, auth, response }: HttpContext) {
        if (auth.user!.role !== 'admin') return response.unauthorized()

        const data = request.only(['title', 'era', 'description', 'releaseDate', 'imageUrl', 'bannerImageUrl', 'historicalYear', 'platforms', 'developer', 'publisher'])
        const game = await Game.findOrFail(params.id)

        // 🧬 DNA FIX: Convert string to Luxon object
        if (data.releaseDate) {
            data.releaseDate = DateTime.fromISO(data.releaseDate)
        }
        
        if (data.historicalYear === '') {
            data.historicalYear = null
        }

        game.merge(data)
        await game.save()

        return response.redirect(`/games/${game.id}`)
    }

    /**
     * 🛡️ ADMIN ONLY: Purge sequence
     */
    public async destroy({ params, auth, response }: HttpContext) {
        if (auth.user!.role !== 'admin') return response.unauthorized()

        const game = await Game.findOrFail(params.id)
        await game.delete()

        return response.redirect('/games')
    }
}