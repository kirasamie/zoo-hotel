/* eslint-disable no-nested-ternary */
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, styled } from '@mui/material';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchRegisterUser } from '../../../redux/thunkActions';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export type InputsUserType = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  avatar?: string;
  phone?: number;
};

export default function RegisterForm({ setIsLogin }): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialStateRegisterForm = { firstName: '', lastName: '', email: '', password: '', avatar: '', phone: 0 };

  const [inputs, setInputs] = useState<InputsUserType>(initialStateRegisterForm);

  const handlerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [avatarFile, setAvatarFile] = useState();
  const handlerRegister = async (): Promise<void> => {
    dispatch(fetchRegisterUser(inputs))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/');
        }
      })
      .catch((error) => console.log(error));
  };

  const changeAvatarHandler = (e) => {
    console.log(e.target.files[0]);
  };

  const sendFile = async () => {
    const data = new FormData();
    if (avatarFile) {
      data.append('avatar', avatarFile);
      const response = await axios.post(`${import.meta.env.VITE_URL}/image`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      console.log(response);
    }
  };

  useEffect(() => {
    sendFile();
  }, [avatarFile]);

  return (
    <div className="authContainer">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& > :not(style)': { m: 1 },
        }}
      >
        <Button component="label" role={undefined} variant="contained" tabIndex={-1}>
          Загрузить аватар
          <VisuallyHiddenInput type="file" name="avatar" accept="image/png, image/jpeg, image/jpg" onChange={(e: ChangeEvent<HTMLInputElement>) => void setAvatarFile(e.target.files[0])} />
        </Button>
        <TextField
          label="Ваше имя"
          type="text"
          name="firstName"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          label="Ваша фамилия"
          type="text"
          name="lastName"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          label="Контактный номер телефона"
          type="text"
          name="phone"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          label="Email"
          helperText="Ваша почта должна быть уникальна"
          type="text"
          name="email"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          type="password"
          name="password"
          // id="demo-helper-text-aligned"
          label="Пароль"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />

        <TextField
          label="Загрузить фото"
          helperText="Вы можете загрузить аватар"
          type="text"
          name="avatar"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          helperText="Место забронировано под капчу"
          type="text"
          name="lastName"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <Button variant="contained" color="success" onClick={() => void handlerRegister()}>
          Регистрация
        </Button>
        <Button variant="contained" onClick={() => setIsLogin(true)}>
          Уже зарегистрированы? Войти
        </Button>
      </Box>
    </div>
  );
}
