import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useAuth } from "../../hooks/auth.hook"

export const LoginForm = ({head, isUser}) => {
    const { login, logout, userId, token, isReady, isAuth } = useContext(AuthContext)
    const [form, setForm] =useState({
        email:"",
        password:""
    })
    const changeHandler = (e) =>{
        setForm({...form, [e.target.name]:e.target.value})
    }
    console.log(token)
    const navigate = useNavigate()
    const registerHandler = async (e) =>{
        try {       
            let res =     
            isUser?
            await axios.post("http://localhost:5000/login", {...form},
            {headers:{
                "Content-Type":"application/json"
            }})
            :await axios.post("http://localhost:5000/registration", {...form},
            {headers:{
                "Content-Type":"application/json"
            }})
            console.log(res.data)
            
           login(res.data.token, res.data.userId)
            
            navigate("/",{replace:true})
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="container">
            <div className="auth-page">
                <h3>{head}</h3>
                <form className="form form-login"  onSubmit={e=>e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                value={form.email}
                                onChange={changeHandler}
                                type="email"
                                name="email"
                                className="validate"
                            />
                            <label htmlFor="email">email</label>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    value = {form.password}
                                    onChange={changeHandler}
                                    type="password"
                                    name="password"
                                    className="validate"
                                />
                                <label htmlFor="email">password</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <button 
                            onClick={registerHandler}
                            className="wawes-effect wawes-light btn btn blue"
                            >Отправить</button>
                        {
                            isUser? 
                            <Link to="/registration" className="btn-outline btn-reg">Нет аккаунта? Зарегистрируйтесь</Link>
                            :<Link to="/login" className="btn-outline btn-reg">Есть аккаунт? Войдите</Link>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}