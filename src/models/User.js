const {sequelize} = require("../data/db")
const {Sequelize} = require("sequelize")

User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    }
})

module.exports = {User}

