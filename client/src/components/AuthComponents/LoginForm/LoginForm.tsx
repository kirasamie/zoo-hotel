/* eslint-disable no-nested-ternary */
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchLoginUser } from '../../../redux/thunkActions';
import { Box, Button, TextField } from '@mui/material';

type InputsUserType = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  avatar?: string;
  phone?: number;
};

export default function LoginForm({ setIsLogin }): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialStateRegisterForm = { email: '', password: '' };

  const [inputs, setInputs] = useState<InputsUserType>(initialStateRegisterForm);

  const handlerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerLogin = async (): Promise<void> => {
    dispatch(fetchLoginUser(inputs))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/');
        }
      })
      .catch((error) => console.log(error));
  };

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
        <TextField
          // helperText="Your email must be unique"
          label="Email"
          type="text"
          name="email"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          // helperText="Please enter your password"
          type="password"
          name="password"
          // id="demo-helper-text-aligned"
          label="Password"
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <Button variant="contained" color="success" onClick={() => void handlerLogin()}>
          Войти
        </Button>
        <Button variant="contained" onClick={() => setIsLogin(false)}>
          Ещё не зарегистрированы?
        </Button>
      </Box>
    </div>
  );
}
