import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./AccountPage.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import {
  fetchCheckOrdersByUser,
  fetchCheckOrdersByWorker,
} from "../../redux/thunkActions";
import cn from "classnames";
import { fetchCheckAllComments } from "../../redux/comment/async-action";

export default function AccountPage(): JSX.Element {
  const pets = useAppSelector((store) => store.petSlice.pets);
  const user = useAppSelector((store) => store.userSlice.info);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    void dispatch(fetchCheckOrdersByUser());
    void dispatch(fetchCheckOrdersByWorker());
    void dispatch(fetchCheckAllComments());
  }, [dispatch]);

  const buttons = [
    {
      title: "ЗАКАЗЫ",
      url: "orders",
      isActive: location.pathname.includes("/orders"),
    },
    {
      title: "ПРОФИЛЬ",
      url: "profile",
      isActive: location.pathname.includes("/profile"),
    },
  ];
  if (!user.isWorker) {
    buttons.push({
      title: "КАБИНЕТ ПИТОМЦА",
      url: pets.length ? `pets/${pets[0].id}` : `pets`,
      isActive: location.pathname.includes("/pets"),
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.groupBtn}>
        {buttons.map((el) => {
          return (
            <Link key={el.title} to={el.url}>
              <button
                className={cn(
                  styles.accountNavBtn,
                  el.isActive ? styles.activeNavBtn : ""
                )}
              >
                {el.title}
              </button>
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}
