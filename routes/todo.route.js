



const { Router } = require('express')
const todoRouter = Router()
const Todo = require("../models/Todo")

todoRouter.delete("/todo/:id", async (req, res) => {
    try {
        const id = req.params.id
        const todo = await Todo.deleteOne({ _id: id })
        res.status(201).json({ message: "удалено" })
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Чтото пошло не так"})
    }
})


todoRouter.get("/todo", async (req, res) => {
    try {
        console.log("запрос на получение всех постов")
        const { userId } = req.query
        const todo = await Todo.find({ owner: userId })
        res.json(todo)
    } catch (error) {
        console.log(error)
    }
})


todoRouter.post("/add", async (req, res) => {
    try {
        console.log("/add")
        const { text, userId } = req.body

        const todo = await new Todo({
            text,
            owner: userId,
            completed: false,
            important: false
        })

        await todo.save()

        res.json(todo)
    } catch (error) {
        console.log(error)
    }
})

module.exports = todoRouter