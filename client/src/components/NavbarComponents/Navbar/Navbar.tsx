import { Link, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchLogoutUser } from '../../../redux/thunkActions';
import { Button } from '@mui/material';

export default function Navbar(): JSX.Element {
  const user = useAppSelector((store) => store.userSlice.info);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handlerLogout = async (): Promise<void> => {
    dispatch(fetchLogoutUser())
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  };

  return (
    <div className={style.container}>
      <div>
        <Link to='/'>
          <Button>TEEPLEED LOGO</Button>
        </Link>
        {user.isWorker ? null : (
          <Link to='/rooms '>
            <Button>Комнатки</Button>
          </Link>
        )}
        {user.isWorker ? null : (
          <Link to='/another'>
            <Button>Услуги</Button>
          </Link>
        )}
      </div>
      <div className={style.authContainer}>
        {user && user.id > 0 ? (
          <>
            <Link to='/account'>
              <Button>Личный кабинет</Button>
            </Link>
            <Button onClick={() => void handlerLogout()}>Выйти</Button>
          </>
        ) : (
          <Link to='/auth'>
            <Button>Войти</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
