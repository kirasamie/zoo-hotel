import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import style from './AccountPage.module.css'

export default function Navbar(): JSX.Element {

  return (
    <div className={style.container}>
        <div>
            <Link to='order'>
                <Button>Заказы</Button>
            </Link>
            <Link to='info'>
                <Button>Профиль</Button>
            </Link>
            <Link to='pets'>
                <Button>Кабинет питомца</Button>
            </Link>
        </div>
        <Outlet />
      </div>
  )
            }