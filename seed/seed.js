const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')

const userData = require('./users.json')
const commentData = require('./comments.json')
const postData = require('./posts.json')


const seedDatabase = async() => {
    await sequelize.sync({ force: true })
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    })
    const comments = await Comment.bulkCreate(commentData)
    const posts = await Post.bulkCreate(postData)
}

seedDatabase()