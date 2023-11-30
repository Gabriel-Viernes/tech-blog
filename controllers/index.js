const router = require('express').Router()

router.get('/', (req, res) => {
	try {
        res.render('home')
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    try {
        res.render('signup')
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
