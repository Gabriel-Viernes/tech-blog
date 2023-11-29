const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./controllers')
const helpers = require('/utils/helpers')

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(sessions.Store)

const app = express()
const PORT = process.env.PORT || 3001

const hbs = exphbs.create({helpers})

const sess = {
	secret: 'pinkguy',
	cookie: {
		maxAge: 3000,
		httpOnly: true,
		secure: false,
		sameSite: 'strict'
	},
	resave: false,
	saveUninitiallized: true,
	store: new SequelizeStore({
		db: sequelize
	})
}

app.use(express.json())
app.use(express.urlencoded({extended:true})
app.use(express.static(path.join(__dirname, 'public')))

app.use(session(sess))

app.use(routes)

sequelize.sync({force: false}).then(()=> {
	app.listen(PORT,() => console.log('Now listening')
})
