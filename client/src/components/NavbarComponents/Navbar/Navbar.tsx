import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import style from './Navbar.module.css';
import { useState } from "react";
import axios from "axios";

export default function Navbar(): JSX.Element {
    const [stateAuth, setStateAuth] = useState(false);
    const navigate = useNavigate();
    const handlerLogout = async(): Promise<void> => {
        axios.get(`${import.meta.env.VITE_URL}/user/logout`, {withCredentials: true})
        .then(() => navigate('/'))
        .catch((error) => console.log(error))
        setStateAuth(false)
    }

  return (
    <div className={style.container}>
        <div>
            <Link to='/'>
                <Button>TEEPLEED LOGO</Button>
            </Link>
            <Link to='/rooms'>
                <Button>Комнатки</Button>
            </Link>
            <Link to='/another'>
                <Button>Услуги</Button>
            </Link>
        </div>
        <div className={style.authContainer}>
            {stateAuth ? (
            <>
            <Link to='/profile'>
                <Button>Личный кабинет</Button>
            </Link>    
                <Button onClick={() => void handlerLogout()}>Выйти</Button>
            </>
            ) 
            :
            (
            <Link to='/auth'>
                <Button onClick={() => void setStateAuth(true)}>Войти</Button>
            </Link>
            )}
        </div>
    </div>          
  )
}
