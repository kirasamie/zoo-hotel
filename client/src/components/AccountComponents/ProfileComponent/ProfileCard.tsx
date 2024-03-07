import React from 'react';
import styles from './ProfileCard.module.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useEffect, useState } from 'react';
import { fetchEditUser } from '../../../redux/thunkActions';
import { UserEditType } from '../../../models/User';
import { Button, TextField } from '@mui/material';

export default function ProfileCard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.info);

  const [isEditMode, setIsEditMode] = useState(false);
  const initialStateUser = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const [inputs, setInputs] = React.useState<UserEditType>(initialStateUser);

  useEffect(() => {
    if (user) {
      setInputs({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    } else {
      setInputs(initialStateUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerEditUser = async (): Promise<void> => {
    void dispatch(fetchEditUser(inputs));
    setIsEditMode(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <div
          className={styles.photo}
          style={{
            backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/219/219983.png)`,
          }}
        />
        {!isEditMode ? (
          <div className={styles.info}>
            <div>Имя: {user.firstName}</div>
            <div>Фамилия: {user?.lastName}</div>
            <div>Email: {user?.email}</div>
            <div>Контактный телефон: {user?.phone}</div>
          </div>
        ) : (
          <div className={styles.info}>
            <TextField fullWidth id="outlined-multiline-flexible" name="firstName" value={inputs.firstName} onChange={(e) => handlerChange(e)} label="Имя" multiline maxRows={4} />
            <TextField fullWidth id="outlined-multiline-flexible" name="lastName" value={inputs.lastName} onChange={(e) => handlerChange(e)} label="Фамилия" multiline maxRows={4} />
            <TextField fullWidth id="outlined-multiline-flexible" name="email" value={inputs.email} onChange={(e) => handlerChange(e)} label="Email" multiline maxRows={4} />
            <TextField fullWidth id="outlined-multiline-flexible" name="phone" value={inputs.phone} onChange={(e) => handlerChange(e)} label="Контактный телефон" multiline maxRows={4} />
          </div>
        )}
      </div>
      {isEditMode ? (
        <Button onClick={() => void handlerEditUser()} variant="contained">
          Сохранить
        </Button>
      ) : (
        <Button onClick={() => setIsEditMode(true)}>Редактировать</Button>
      )}
    </div>
  );
}
