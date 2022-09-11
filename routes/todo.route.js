



const {Router} = require('express')
const todoRouter = Router()
const Todo = require("../models/Todo")


todoRouter.post("/add", async(req, res)=>{
    try {
        console.log("/add")
        const {text, userId} = req.body

        const todo = await new Todo({
            text,
            owner:userId,
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