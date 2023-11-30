const express =  require('express')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()

const sess = {
	secret: 'iusearchbtw',
	cookie: {
		maxAge: 300000,
		httpOnly: true,
		secure: false,
		sameSite: strict
	},
	resave: false,
	saveUninitialized: false,
	store: new SequelizeStore({
		db: sequelize,
	})
}
app.use(session(sess))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))
app.get('/', (req, res) => {
	res.render('home')
})

app.listen(3001, () => {
	console.log('started')
})