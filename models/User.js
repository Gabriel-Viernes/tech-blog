const { Model, Datatypes} = require('sequelize')
const sequelize = require('../config/connection')

class User extends Model{}

User.init(
    {
        id: {
            type: Datatypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)
module.exports = User