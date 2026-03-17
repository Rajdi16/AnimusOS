import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
    public async index({ view }: HttpContext) {
        const books = await Book.all()
        return view.render('pages/books/index', { books })
    }
    public async show({ params, view }: HttpContext) {
        const book = await Book.findOrFail(params.id)
        return view.render('pages/books/show', { book })
    }
    public async create({ view }: HttpContext) {
        return view.render('pages/books/create')
    }
    public async store({ request, response, session }: HttpContext) {
        const data = request.only([
            'title', 'author', 'published_year', 'genre', 'summary',
            'isbn', 'cover_image_url', 'is_available', 'number_of_pages',
            'language', 'publisher'
        ])

        await Book.create(data)

        session.flash('success', 'NEW CODEX SYNCHRONIZED: Historical records updated.')
        return response.redirect().toRoute('books.index')
    }
    public async edit({ params, view }: HttpContext) {
        const book = await Book.findOrFail(params.id)
        return view.render('pages/books/edit', { book })
    }
    public async update({ params, request, response, session }: HttpContext) {
        const book = await Book.findOrFail(params.id)
        const data = request.only([
            'title', 'author', 'published_year', 'genre', 'summary',
            'isbn', 'cover_image_url', 'is_available', 'number_of_pages',
            'language', 'publisher'
        ])

        book.merge(data)
        await book.save()

        session.flash('success', 'CODEX MODIFIED: Genetic data restabilized.')
        return response.redirect().toRoute('books.show', { id: book.id })
    }
    public async destroy({ params, response, session }: HttpContext) {
        const book = await Book.findOrFail(params.id)
        await book.delete()

        session.flash('error', 'DATA ERASED: Codex removed from local database.')
        return response.redirect().toRoute('books.index')
    }
}