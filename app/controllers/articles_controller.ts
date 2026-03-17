import type { HttpContext } from '@adonisjs/core/http'
import Article from '#models/article'

export default class ArticlesController {

  async index({ view }: HttpContext) {
    const articles = await Article.query().preload('game').orderBy('publishedAt', 'desc')
    return view.render('pages/articles/index', { articles })
  }

  async show({ params, view }: HttpContext) {
    const article = await Article.query().where('id', params.id).preload('game').firstOrFail()
    return view.render('pages/articles/show', { article })
  }
}