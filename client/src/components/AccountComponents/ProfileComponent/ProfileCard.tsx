import styles from "./ProfileCard.module.css";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";

import { Button } from "@mui/material";
import EditModal from "./EditModal";

export default function ProfileCard() {
  const user = useAppSelector((store) => store.userSlice.info);
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <div
          className={styles.photo}
          style={{
            backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/219/219983.png)`,
          }}
        />
        <div className={styles.info}>
          <div>Имя: {user.firstName}</div>
          <div>Фамилия: {user?.lastName}</div>
          <div>Email: {user?.email}</div>
          <div>Контактный телефон: {user?.phone}</div>
        </div>
      </div>
      <Button onClick={() => setIsOpenModal(true)}>Редактировать</Button>
      {isOpenModal && <EditModal user={user} setIsOpenModal={setIsOpenModal} />}
    </div>
  );
}
