import { Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import style from "./AccountPage.module.css";
import { useAppSelector } from "../../redux/hooks";

export default function Navbar(): JSX.Element {
  const pets = useAppSelector((store) => store.petSlice.pets);
  return (
    <div className={style.container}>
      <div>
        <Link to="order">
          <Button>Заказы</Button>
        </Link>
        <Link to="info">
          <Button>Профиль</Button>
        </Link>
        <Link to={pets.length ? `pets/${pets[0].id}` : `pets` }>
          <Button>Кабинет питомца</Button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
