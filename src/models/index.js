
const {User} = require("./User")
const {Board} = require("./Board")
const {Cheese} = require("./Cheese")


User.hasMany(Board, {as: 'boards'})
Board.belongsTo(User, {as: 'user'})


Board.belongsToMany(Cheese, {through:'cheeseBoards', as: 'cheeses'})
Cheese.belongsToMany(Board, {through:'cheeseBoards', as: 'board'})

module.exports = {User, Board, Cheese}
