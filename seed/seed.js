const sequelize = require('../config/connection')
const User = require('../models/User')

const userData = require('./users.json')

const seedDatabase = async() => {
    await sequelize.sync({ force: true })

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    })
}

seedDatabase()