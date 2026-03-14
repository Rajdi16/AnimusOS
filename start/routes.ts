import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel' // Required to protect the profile routes
import AuthController from '#controllers/auth_controller'
import SessionController from '#controllers/session_controller'

// Lazy-loaded controllers
const GamesController = () => import('#controllers/games_controller')
const CharactersController = () => import('#controllers/characters_controller')
const BooksController = () => import('#controllers/books_controller')
const ProfilesController = () => import('#controllers/profiles_controller') // <--- ADDED THIS

// 1. Home
router.on('/').render('pages/home').as('home')

// 2. Database Resources
router.resource('games', GamesController).as('games')
router.resource('characters', CharactersController).as('characters')
router.resource('books', BooksController).as('books')

// 3. 🛡️ USER PROFILE ROUTES (This fixes your exact error!)
router.group(() => {
    router.get('/profile/edit', [ProfilesController, 'edit']).as('profile.edit')
    router.put('/profile', [ProfilesController, 'update']).as('profile.update')
    router.delete('/profile', [ProfilesController, 'destroy']).as('profile.destroy')
}).use(middleware.auth())

// 4. Authentication
router.get('/register', [AuthController, 'registerView']).as('auth.register.view')
router.post('/register', [AuthController, 'register']).as('auth.register')
router.get('/login', [SessionController, 'create']).as('session.create')
router.post('/login', [SessionController, 'store']).as('session.store')
router.post('/logout', [SessionController, 'destroy']).as('session.destroy')