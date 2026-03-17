import type { HttpContext } from '@adonisjs/core/http'
import Article from '#models/article'
import Game from '#models/game'

export default class HomeController {
  async index({ view }: HttpContext) {
    const articles = await Article.query().orderBy('publishedAt', 'desc').limit(3)
    const featuredGames = await Game.query().orderBy('releaseDate', 'desc').limit(2)

    return view.render('pages/home', { articles, featuredGames })
  }
}