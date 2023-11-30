const express =  require('express')
const path = require('path')
const sequelize = require('./config/connection.js')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const controllers = require('./controllers')

//create express app
const app = express()

//define session and have express app use it
const newStore = new SequelizeStore({
		db: sequelize,
})
const cookie = {
	maxAge:300000,
	httpOnly:true,
	secure:false,
	sameSite:'strict'
}
app.use(session({
	secret: 'iusearchbtw',
	store: newStore,
	resave: false,
	cookie: cookie
}))

//set app to use handlebars
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

//set app to use public static files
app.use(express.static('public'))

app.use(controllers)

sequelize.sync( {force: false }).then(() => {
	app.listen(3001, () => {
		console.log('listening on 3001')
	})
})