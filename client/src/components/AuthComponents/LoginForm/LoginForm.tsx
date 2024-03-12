/* eslint-disable no-nested-ternary */
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchLoginUser } from '../../../redux/thunkActions';
import { Box, Button, TextField, alpha, styled } from '@mui/material';
import GlassWrapper from '../../GlassWrapper/GlassWrapper';

function validateEmail(email: string) {
  return email.toLowerCase().match(/^[a-z/._/0-9]*[@][a-z]*[/.][a-z]{2,4}$/);
}

export type ErrorMsgType = {
  email: string;
  password: string;
};

const OrangeButton = styled(Button)({
  color: '#ffffff',
  textShadow: '0 1px 2px #000000',
  fontWeight: 'bold',
  backgroundColor: '#f6ae2d',
  '&:hover': {
    backgroundColor: '#ffc862',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#ffa600',
    borderColor: '#d38900',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(255, 200, 98,.5)',
  },
});

const OrangeTextfield = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& label': {
    color: 'orange',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'orange',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
});

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
  const [showError, setShowError] = useState<ErrorMsgType>({});

  const [inputs, setInputs] = useState<InputsUserType>(
    initialStateRegisterForm
  );

  const checkError = () => {
    const errorMsg = {
      email: '',
      password: '',
    };
    if (inputs.password.trim().length === 0) {
      errorMsg.password = 'Необходимо ввести ваш пароль!';
    }
    if (inputs.email.trim().length === 0) {
      errorMsg.email = 'Необходимо ввести ваш email!';
    }
    // if (!validateEmail(inputs.email)) {
    //   errorMsg.email =
    //     'Ваш email необходимо ввести в формате example@example.com';
    // }
    setShowError({ ...errorMsg });
    // ТУТ ОТКЛЮЧЕНА ВАЛИДАЦИЯ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return false || Object.entries(errorMsg).some((el) => el[1].length !== 0);
  };

  const handlerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerLogin = async (): Promise<void> => {
    if (!checkError()) {
      dispatch(fetchLoginUser(inputs))
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            const { isWorker } = res.payload;
            isWorker ? navigate('/account') : navigate('/account/pets');
            setShowError((prev) => ({ ...prev, [e.target.name]: '', msg: '' }));
          } else {
            const status = Number(res.error.message?.slice(-3));
            if (status === 401) {
              setShowError((prev) => ({
                ...prev,
                msg: `Почта ${inputs.email} не найдена!`,
              }));
            } else if (status === 402) {
              setShowError((prev) => ({
                ...prev,
                msg: `Пароль неверный! Попробуйте ещё раз!`,
              }));
            }
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className='authContainer'>
      <GlassWrapper width='500px'>
        <div style={{ color: '#d32f2f' }}>{showError.msg}</div>
        <OrangeTextfield
          error={!!showError.email}
          helperText={showError.email}
          size='small'
          variant='outlined'
          label='Email'
          type='text'
          name='email'
          onChange={(e) => void handlerChange(e)}
          fullWidth
        />
        <OrangeTextfield
          error={!!showError.password}
          helperText={showError.password}
          size='small'
          variant='outlined'
          label='Password'
          type='password'
          name='password'
          onChange={(e) => void handlerChange(e)}
          fullWidth
        />
        <OrangeButton variant='outlined' onClick={() => void handlerLogin()}>
          Войти
        </OrangeButton>
        <OrangeButton variant='outlined' onClick={() => setIsLogin(false)}>
          Ещё не зарегистрированы?
        </OrangeButton>
      </GlassWrapper>
    </div>
  );
}
