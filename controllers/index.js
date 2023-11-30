const router = require('express').Router()
const checkAuth = require('../utils/auth')
const { User, Post, Comment } = require('../models')
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

router.get('/dashboard', checkAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: ['password'],
            },
            include:[
                {
                    model: Post
                },
                {
                    model: Comment
                }
            ]
        })

        const user = userData.get({ plain: true })

        res.render('dashboard', {
            ...user,
            logged_in:true
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)

    }
})

router.post('/login',  async (req, res) => {
    console.log(req.session)
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
       
        if(userData) {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                res.json({message: "You are now logged in"})
            })
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
