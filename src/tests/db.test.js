const { sequelize } = require("../data/db")
const { User, Board, Cheese } = require("../models/index")

describe("Database tests:", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    it("can create a user", async () => {
        const user = await User.create({
            name: "John Doe",
            email: "email@email.com"})
        expect(user.name).toBe("John Doe");
        expect(user.email).toBe("email@email.com");
        expect(user.id).toBe(1);
        expect(user).toBeInstanceOf(User);
    })

    it("can create a board", async () => {
        const board = await Board.create({
            type: "Hard",
            description: "A hard cheese",
            rating: 5})
        expect(board.type).toBe("Hard");
        expect(board.description).toBe("A hard cheese");
        expect(board.rating).toBe(5);
        expect(board.id).toBe(1);
        expect(board).toBeInstanceOf(Board);
    })

    it("can create a cheese", async () => {
        const cheese = await Cheese.create({
            title: "Cheddar",
            description: "A hard cheese"})
        expect(cheese.title).toBe("Cheddar");
        expect(cheese.description).toBe("A hard cheese");
        expect(cheese.id).toBe(1);
        expect(cheese).toBeInstanceOf(Cheese);
    })

    it("can create a user with a board", async () => {
        const user = await User.create({
            name: "John Smith",
            email: "smith@email.com"})
        const board = await Board.create({
            type: "Soft",
            description: "A soft cheese",
            rating: 4})
        await user.addBoard(board)
        const userBoards = await user.getBoards()
        expect(userBoards[0].type).toBe("Soft");
        expect(userBoards[0].description).toBe("A soft cheese");
        expect(userBoards[0].rating).toBe(4);
        expect(userBoards[0].id).toBe(1);
        expect(userBoards[0]).toBeInstanceOf(Board);
    })

    it("can create a board with a cheese", async () => {
        const board = await Board.create({
            type: "Blue",
            description: "A blue cheese",
            rating: 3})
        const cheese = await Cheese.create({
            title: "Brie",
            description: "A soft cheese"})
        await board.addCheese(cheese)
        const boardCheeses = await board.getCheeses()
        expect(boardCheeses[0].title).toBe("Brie");
        expect(boardCheeses[0].description).toBe("A soft cheese");
        expect(boardCheeses[0].id).toBe(1);
        expect(boardCheeses[0]).toBeInstanceOf(Cheese);
    })

    it("can create a user with a board and a cheese", async () => {
        const user = await User.create({
            name: "John Random",
            email: "random@email.com"})
        const board = await Board.create({
            type: "Sheep",
            description: "A sheep cheese",
            rating: 2})
        const cheese = await Cheese.create({
            title: "Gouda",
            description: "A hard cheese"})
        await user.addBoard(board)
        await board.addCheese(cheese)
        const userBoards = await user.getBoards()
        expect(userBoards[0].type).toBe("Sheep");
        expect(userBoards[0].description).toBe("A sheep cheese");
        expect(userBoards[0].rating).toBe(2);
        expect(userBoards[0].id).toBe(1);
        expect(userBoards[0]).toBeInstanceOf(Board);
        const boardCheeses = await userBoards[0].getCheeses()
        expect(boardCheeses[0].title).toBe("Gouda");
        expect(boardCheeses[0].description).toBe("A hard cheese");
        expect(boardCheeses[0].id).toBe(1);
        expect(boardCheeses[0]).toBeInstanceOf(Cheese);
        })

    it("can create a board with a cheese and a user", async () => {
        const board = await Board.create({
            type: "Cow",
            description: "A cow cheese",
            rating: 1})
        const cheese = await Cheese.create({
            title: "Swiss",
            description: "A hard cheese"})
        const user = await User.create({
            name: "Johnny Bravo",
            email: "bravo@email.com"})

        await board.addCheese(cheese)
        await board.setUser(user)
        await user.addBoard(board)
        const boardCheeses = await board.getCheeses()
        expect(boardCheeses[0].title).toBe("Swiss");
        expect(boardCheeses[0].description).toBe("A hard cheese");
        expect(boardCheeses[0].id).toBe(1);
        expect(boardCheeses[0]).toBeInstanceOf(Cheese);
        const userBoards = await board.getUser()
        expect(userBoards.name).toBe("Johnny Bravo");
        expect(userBoards.email).toBe("bravo@email.com");
        expect(userBoards.id).toBe(1);
        expect(userBoards).toBeInstanceOf(User);

    })
})