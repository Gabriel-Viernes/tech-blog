const router = require('express').Router()
const checkAuth = require('../utils/auth')
const { User, Post, Comment } = require('../models')

//home route
router.get('/', async (req, res) => {
	try {
        const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            })
        const postsMap = posts.map((post) => post.get({ plain: true }))
        res.render('home', {
            postsMap,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//login get route
router.get('/login', (req, res) => {
    try {
        res.render('signup')
    } catch(err) {
        res.status(500).json(err)
    }
})
//login post route
router.post('/login',  async (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/')
        return;
    }
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

router.post('/logout', async (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else{
        res.status(404).end()
    }
})

//dashboard get route
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
        console.log(user)
        res.render('dashboard', {
            ...user,
            logged_in:true
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)

    }
})


// signup post route
router.post('/signup', (req, res) => {
    User.create(req.body).then((user) => {
        res.status(200).json(user)
    }).catch((err) => {
        res.status(400).json(err)
    })
})

//new post get route
router.get('/newPost', checkAuth, async (req, res) => {
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
        res.render('newPost', {
            ...user,
            logged_in:true
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
// new post post route
router.post('/newPost', checkAuth, async (req,res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        })

        res.status(200).json(newPost)
    } catch(err) {
        res.status(500).json(err)
    }
})
module.exports = router
