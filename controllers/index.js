const router = require('express').Router()
const checkAuth = require('../utils/auth')
const User = require('../models/User')
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

router.get('/dashboard', checkAuth, (req, res) => {
    try {
        res.render('dashboard')
    } catch(err) {
        res.status(500).json(err)
    }
})

router.post('/login',  async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        if(userData) {
            res.render('dashboard')
        } else {
            res.status(404).json({'message':'User not found'})
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

router.post('/signup', (req, res) => {
    User.create(req.body).then((user) => {
        res.status(200).json(user)
    }).catch((err) => {
        res.status(400).json(err)
    })
})
module.exports = router
