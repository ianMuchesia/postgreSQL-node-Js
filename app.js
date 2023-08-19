const express = require("express")
const cors = require("cors")
const pool = require("./db")
require('dotenv').config()
const app = express();


//middleware
app.use(cors())
app.use(express.json());



//ROUTES
//create a todo

app.post("/api/v1/todos", async(req, res)=>{
    try {
        const { description} = req.body
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description])


        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//update a todo
app.patch("/api/v1/todos/:id", async(req, res)=>{
    try {
        const { description} = req.body
        const { id } = req.params;
        const newTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id])


        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})



//getAllTodos


app.get("/api/v1/todos" , async(req,res)=>{
    try {
        const todos = await pool.query("SELECT * FROM todo")
        res.json(todos.rows)
    } catch (error) {
        console.error(error.message)
    }
})



app.listen(4000, ()=>{
    console.log("server running on port 4000")
})