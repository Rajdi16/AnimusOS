import type { HttpContext } from '@adonisjs/core/http'
import Thread from '#models/thread'
import Post from '#models/post'
import vine from '@vinejs/vine'

export default class ForumController {

    public async index({ view }: HttpContext) {
        const threads = await Thread.query().preload('user').orderBy('createdAt', 'desc')
        return view.render('pages/forum/index', { threads })
    }
    public async show({ params, view }: HttpContext) {
        const thread = await Thread.findOrFail(params.id)
        await thread.load('user')
        await thread.load('posts', (postsQuery) => {
            postsQuery.preload('user').orderBy('createdAt', 'asc')
        })
        return view.render('pages/forum/show', { thread })
    }

    public async create({ view }: HttpContext) {
        return view.render('pages/forum/create')
    }
    public async store({ request, response, auth, session }: HttpContext) {
        const data = await request.validateUsing(
            vine.compile(
                vine.object({
                    title: vine.string().trim().minLength(5).maxLength(100),
                    body: vine.string().trim().minLength(10)
                })
            )
        )

        const user = auth.user!
        await user.related('threads').create(data)

        session.flash('success', 'THREAD ESTABLISHED: Communications channel open.')
        return response.redirect().toRoute('forum.index')
    }

    public async destroy({ params, response, auth, session }: HttpContext) {
        const thread = await Thread.findOrFail(params.id)

        const isAdmin = auth.user!.role === 'admin'
        const isOwner = String(auth.user!.id) === String(thread.userId)

        if (!isAdmin && !isOwner) {
            session.flash('error', 'ACCESS DENIED: Insufficient clearance to close this channel.')
            return response.redirect().back()
        }

        await Post.query().where('thread_id', thread.id).delete()
        await thread.delete()
        session.flash('success', 'CHANNEL CLOSED: Thread and all data purged.')
        return response.redirect().toRoute('forum.index')
    }

    public async storePost({ params, request, response, auth, session }: HttpContext) {
        const data = await request.validateUsing(
            vine.compile(vine.object({ body: vine.string().trim().minLength(2) }))
        )

        const user = auth.user!
        await Post.create({
            body: data.body,
            userId: user.id,
            threadId: params.id
        })

        session.flash('success', 'REPLY SENT: Data added to the thread.')
        return response.redirect().back()
    }

    public async destroyPost({ params, response, auth, session }: HttpContext) {
        const post = await Post.findOrFail(params.id)

        const isAdmin = auth.user!.role === 'admin'
        const isOwner = String(auth.user!.id) === String(post.userId)

        if (!isAdmin && !isOwner) {
            session.flash('error', 'ACCESS DENIED: Identity mismatch. Deletion aborted.')
            return response.redirect().back()
        }

        await post.delete()
        session.flash('success', 'TRANSMISSION SCRUBBED: Data removed from the network.')
        return response.redirect().back()
    }
}