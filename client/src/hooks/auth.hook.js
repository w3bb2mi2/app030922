import axios from "axios"
import { useCallback, useEffect, useState } from "react"


export const useAuth = () => {
    
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    


    
    const login = useCallback(
        (jwtToken, id) => {
            setToken(jwtToken)
            setUserId(id)
            localStorage.setItem('userData', JSON.stringify({
                userId: id,
                token: jwtToken
            }))
            setIsAuth(true)
        }, []
    )
    const logout = () => {
        setToken(null)
        setUserId(null)
        setIsAuth(false)
        localStorage.removeItem("userData")
    }
    
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"))
        if (data && data.token) {
            login(data.token, data.userId)
        }
        setIsReady(true)
    }, [login])

    
    return { login, logout, token, userId, isReady, isAuth }
}