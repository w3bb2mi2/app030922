import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./navbar.scss"
export const Navbar = ({isAuth, logout}) => {
    //const { login, logout, userId, token, isReady, isAuth } = useContext(AuthContext)
    //console.log({isAuth})
    //const isAuth = props.isAuth
    
    return (
        <nav>
            <div className="nav-wrapper navbar blue">
            <Link to="/" className="brand-logo">Mern todo APP</Link>
                <ul id="nav-mobile" className="right ">
                    {
                        isAuth?
                        <li><Link to="" onClick={logout}>Выйти</Link></li> 
                        : <li><Link to="/login">Войти</Link></li> 

                    }    
                </ul>
            </div>
        </nav>
    )
}