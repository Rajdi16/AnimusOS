import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// --- LAZY-LOADED CONTROLLERS (For Performance) ---
const GamesController = () => import('#controllers/games_controller')
const CharactersController = () => import('#controllers/characters_controller')
const BooksController = () => import('#controllers/books_controller')
const ProfilesController = () => import('#controllers/profiles_controller')
const AuthController = () => import('#controllers/auth_controller')
const SessionController = () => import('#controllers/session_controller')
const ForumController = () => import('#controllers/forum_controller')
const AdminController = () => import('#controllers/admin_controller')

// 1. THE HUB OVERVIEW (Home)
router.on('/').render('pages/home').as('home')

// 2. DATABASE RESOURCES (Archives)
router.resource('games', GamesController).as('games')
router.resource('characters', CharactersController).as('characters')
router.resource('books', BooksController).as('books')

// 3. USER PROFILE MANAGEMENT
router.group(() => {
    // 👇 NEW: The Profile Activity Hub 👇
    router.get('/profile', [ProfilesController, 'show']).as('profile.show')

    router.get('/profile/edit', [ProfilesController, 'edit']).as('profile.edit')
    router.put('/profile', [ProfilesController, 'update']).as('profile.update')
    router.delete('/profile', [ProfilesController, 'destroy']).as('profile.destroy')
}).use(middleware.auth())

// 4. AUTHENTICATION PROTOCOLS
router.get('/register', [AuthController, 'registerView']).as('auth.register.view')
router.post('/register', [AuthController, 'register']).as('auth.register')
router.get('/login', [SessionController, 'create']).as('session.create')
router.post('/login', [SessionController, 'store']).as('session.store')
router.post('/logout', [SessionController, 'destroy']).as('session.destroy')

// 5. GLOBAL COMMUNICATIONS NETWORK (Forum)
router.group(() => {
    router.get('/forum', [ForumController, 'index']).as('forum.index')
    router.get('/forum/:id', [ForumController, 'show']).as('forum.show')
    router.group(() => {
        router.get('/forum/new/thread', [ForumController, 'create']).as('forum.create')
        router.post('/forum', [ForumController, 'store']).as('forum.store')
        router.delete('/forum/:id', [ForumController, 'destroy']).as('forum.destroy')
        router.post('/forum/reply/:id', [ForumController, 'storePost']).as('forum.reply')
        router.delete('/forum/reply/:id', [ForumController, 'destroyPost']).as('forum.destroyPost')
    }).use(middleware.auth())
})

// 6. GRAND MASTER OVERRIDE (Admin Panel)
router.group(() => {
    router.get('/admin', [AdminController, 'index']).as('admin.dashboard')
    router.delete('/admin/users/:id', [AdminController, 'destroyUser']).as('admin.user.destroy')
    router.delete('/admin/games/:id', [AdminController, 'destroyGame']).as('admin.game.destroy')
    router.delete('/admin/characters/:id', [AdminController, 'destroyCharacter']).as('admin.character.destroy')
}).use(middleware.auth())