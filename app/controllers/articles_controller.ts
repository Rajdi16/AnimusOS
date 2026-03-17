import type { HttpContext } from '@adonisjs/core/http'
import Article from '#models/article'

export default class ArticlesController {

  async index({ view }: HttpContext) {
    const articles = await Article.query().orderBy('publishedAt', 'desc')
    return view.render('pages/articles/index', { articles })
  }

  async show({ params, view }: HttpContext) {
    const article = await Article.findOrFail(params.id)
    return view.render('pages/articles/show', { article })
  }
}