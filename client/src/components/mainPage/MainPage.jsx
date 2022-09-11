import { useState } from "react"
import { useCallback } from "react"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import "./MainPage.scss"
import { useEffect } from "react"
import { TodoItem } from "../todoItem/TodoItem"

export const MainPage = () => {
    const {  userId } = useContext(AuthContext)
    const [text, setText] = useState("")
    const [toDos, setToDo] = useState([])

    const handleRemove = async (_id) => {
        const todo = await axios.delete(`http://localhost:5000/todo/${_id}`) 
        getALLTodos(userId)        
    }
    useEffect(()=>{
        getALLTodos(userId)
        
    },[userId])

    const getALLTodos = async (userId) => {
        const res = await axios.get("http://localhost:5000/todo", {
            headers:{},
            params:{userId: userId}
        })  
        .then(res=>setToDo(res.data))      
        // setTodo(res.data)
    }

    const createToDo = useCallback(
        async () => {
            if(!text){return}
            try {
                await axios.post("http://localhost:5000/add", {
                    text, userId
                })
                .then(getALLTodos(userId))
                setText("")
            } catch (error) {

            }
        }, [text, userId]
    )
    
    
    return (
        <div className="container">
            <div className="main-page">
                <h4>Добавить задачу: </h4>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <input
                            className="validate"
                            name="input"
                            value={text}
                            onChange={e => {                                
                                setText(e.target.value)                                
                            }}
                        />
                        <label htmlFor="input">Задача</label>
                    </div>
                    <div className="row">
                        <button 
                            onClick={createToDo}
                            className="waves-effect waves-light btn blue">Добавить</button>
                    </div>
                </form>
                <h3>Активные задачи</h3>
                <div className="todos">
                    {
                        toDos && toDos.map((item, index)=>
                            <TodoItem handleRemove={()=>handleRemove(item._id)} text={item.text} index={index+1} key={index} _id = {item._id}/>
                        )
                    }
                </div>
                
            </div>
        </div>
    )
}