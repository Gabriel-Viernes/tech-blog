const Post = require('./Post')
const User = require('./User')
const Comment = require('./Comment')

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

Post.belongsTo(User)
Comment.belongsTo(User)
Comment.belongsTo(Post)

module.exports = { User, Post, Comment }