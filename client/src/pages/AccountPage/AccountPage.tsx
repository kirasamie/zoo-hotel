import { Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import style from './AccountPage.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { fetchCheckOrdersByUser, fetchCheckOrdersByWorker } from '../../redux/thunkActions';

export default function AccountPage(): JSX.Element {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const user = useAppSelector((store) => store.userSlice.info);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchCheckOrdersByUser());
    void dispatch(fetchCheckOrdersByWorker());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div>
        <Link to="orders">
          <Button>Заказы</Button>
        </Link>
        <Link to="info">
          <Button>Профиль</Button>
        </Link>
        { user.isWorker ? null :  <Link to={pets.length ? `pets/${pets[0].id}` : `pets`}>
          <Button>Кабинет питомца</Button>
        </Link>}
      </div>
      <Outlet />
    </div>
  );
}
