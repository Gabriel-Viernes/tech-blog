const express =  require('express')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})

const app = express()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
	res.render('home')
})

app.listen(3001, () => {
	console.log('started')
})