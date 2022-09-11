import axios from "axios";
import { useState } from "react";

export function GetALLTodos(userId) {
    const [todos, setTodos] = useState([])

    const getALLTodos = async (userId) => {
        const res = await axios.get("http://localhost:5000/todo", {
            headers: {},
            params: { userId: userId }
        })
            .then(res => setTodos(res.data))
        return todos
    }
    return getALLTodos()
}