import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const TodoItem = ({ text, index, _id, handleRemove }) => {
    const {  userId, getALLTodos } = useContext(AuthContext)
   
    return (
        <div className="todos">
            <div className="row flex todos-item">
                <div className="col todos-num">{index}</div>
                <div className="col todos-text">{text}</div>
                <div className="col todos-buttons">
                    <i className="material-icons blue-text">check</i>
                    <i className="material-icons orange-text">warning</i>
                    <i className="material-icons red-text" onClick={handleRemove}>delete</i>
                </div>
            </div>
        </div>
    )
}