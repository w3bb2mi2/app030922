
import { createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthPage } from './components/authPage/AuthPage';
import { LoginForm } from './components/logintForm/LoginForm';
import { MainPage } from './components/mainPage/MainPage';
import { Navbar } from './components/navbar/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

//const AuthContext = createContext()

function App() {
  const { login, logout, userId, token, isReady, isAuth, getALLTodos, todos } = useAuth()

  return (
    <AuthContext.Provider value={{ login, logout, userId, token, isReady, isAuth }}>
      <BrowserRouter>
        <div className="App">
          <Navbar isAuth={isAuth} logout={logout} />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginForm head="Авторизация" isUser={true} />} />
            <Route path='/registration' element={<LoginForm head="Регистрация" isUser={false} />} />
          </Routes>

        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
