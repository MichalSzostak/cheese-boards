const {sequelize} = require("../data/db")
const {Sequelize} = require("sequelize")

Board = sequelize.define('board', {
    type: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    rating: {
        type: Sequelize.INTEGER,
    }
})

module.exports = {Board}