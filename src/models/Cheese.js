const {sequelize} = require("../data/db")
const {Sequelize} = require("sequelize")

Cheese = sequelize.define('cheese', {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    }
})

module.exports = {Cheese}