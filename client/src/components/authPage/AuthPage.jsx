import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginForm } from "../logintForm/LoginForm"
import './authPage.scss'
export const AuthPage = () => {
    function onsubmit(e) {
        console.log(e)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm head = "Авторизация" isUser={true}/>} />
                <Route path="/registration" element={<LoginForm head = "Регистрация" isUser={false}/>} />
            </Routes>
        </BrowserRouter>
    )
}