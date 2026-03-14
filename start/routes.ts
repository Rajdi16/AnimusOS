import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import SessionController from '#controllers/session_controller'

const GamesController = () => import('#controllers/games_controller')
const CharactersController = () => import('#controllers/characters_controller')

// 1. The Real Index Page (Landing Page)
// This renders the home.edge file we created
router.on('/').render('pages/home').as('home')

// 2. Resources (Games & Characters)
router.resource('games', GamesController).as('games')
router.resource('characters', CharactersController).as('characters')

// 3. Registration (Managed by AuthController)
router.get('/register', [AuthController, 'registerView']).as('auth.register.view')
router.post('/register', [AuthController, 'register']).as('auth.register')

// 4. Sessions / Login (Managed by SessionController)
router.get('/login', [SessionController, 'create']).as('session.create')
router.post('/login', [SessionController, 'store']).as('session.store')
router.post('/logout', [SessionController, 'destroy']).as('session.destroy')