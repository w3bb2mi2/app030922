import { useState } from "react"
import { useCallback } from "react"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import "./MainPage.scss"

export const MainPage = () => {
    const {  userId } = useContext(AuthContext)
    const [text, setText] = useState("")

    // создание нового ToDo

    const createToDo = useCallback(
        async () => {
            try {
                await axios.post("http://localhost:5000/add", {
                    text, userId
                })
                .then(res=>console.log(res.data.text))
            } catch (error) {

            }
        }, [text, userId]
    )
    console.log(text)

    return (
        <div className="container">
            <div className="main-page">
                <h4>Добавить задачу: </h4>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <input
                            className="validate"
                            name="input"
                            onChange={e => {
                                console.log(e.target.value)
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
                    <div className="row flex todos-item">
                        <div className="col todos-num">1</div>
                        <div className="col todos-text">some task</div>
                        <div className="col todos-buttons">
                            <i class="material-icons blue-text">check</i>
                            <i class="material-icons orange-text">warning</i>
                            <i class="material-icons red-text">delete</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}