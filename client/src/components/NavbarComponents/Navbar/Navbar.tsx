import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchLogoutUser } from "../../../redux/thunkActions";
import { Button, styled } from "@mui/material";

export default function Navbar(): JSX.Element {
  const user = useAppSelector((store) => store.userSlice.info);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handlerLogout = async (): Promise<void> => {
    dispatch(fetchLogoutUser())
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  const HeaderButton = styled(Button)({
    color: "#ffffff",
    textShadow: "0 1px 2px #000000",
    fontWeight: "bold",
    backgroundColor: "#f6ae2d",
    "&:hover": {
      backgroundColor: "#ffc862",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#ffa600",
      borderColor: "#d38900",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(255, 200, 98,.5)",
    },
  });

  return (
    <header>
      <div className={styles.container}>
        <Link className={styles.logoContainer} to="/">
          <img className={styles.logo} src="/img/logo.svg" alt="logo" />
          <div className={styles.logoTitle}>ZOOHOTEL</div>
        </Link>
      </div>
      <div className={styles.container}>
        {user && user.id > 0 ? (
          <>
            {user?.isWorker ? null : (
              <Link to="/rooms ">
                <HeaderButton
                  variant="contained"
                  className={styles.headerButton}
                >
                  Комнатки
                </HeaderButton>
              </Link>
            )}
            <Link to="/account">
              <HeaderButton variant="contained" className={styles.headerButton}>
                Личный кабинет
              </HeaderButton>
            </Link>
            <HeaderButton
              onClick={() => void handlerLogout()}
              variant="contained"
              className={styles.headerButton}
            >
              Выйти
            </HeaderButton>
          </>
        ) : (
          <Link to="/auth">
            <HeaderButton variant="contained" className={styles.headerButton}>
              Войти
            </HeaderButton>
          </Link>
        )}
      </div>
    </header>
  );
}
