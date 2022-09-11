const express = require("express")
const mongoose = require('mongoose');
const authRouter = require("./routes/auth.route");
const todoRouter = require("./routes/todo.route");
const cors = require("cors");
const { json } = require("express");
const app = express();
const PORT = process.env.PORT || 5000

app.use(json())
app.use(cors())
//app.use('/api/auth', require("./routes/auth.route"))
async function start(){
    try {
        await mongoose.connect("mongodb://localhost/db030922")
            .then(()=>console.log("MongoDB has been started"))
            .catch(e=>console.log(e))
        app.listen(PORT,()=>{
            console.log(`Server has been started on port: ${PORT}`)
        })
        app.use(authRouter) 
        app.use(todoRouter) 
    } catch (error) {
        console.log(error)
    }
}

start()
