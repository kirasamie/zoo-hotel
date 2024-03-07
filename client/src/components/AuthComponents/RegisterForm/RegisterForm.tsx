/* eslint-disable no-nested-ternary */
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchRegisterUser } from '../../../redux/thunkActions';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, TextField, Box, styled } from '@mui/material';

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

export type SecretWordType = {
  secretWord: string;
};

export default function RegisterForm({ setIsLogin }): JSX.Element {
  const key = '6LdZkJApAAAAAGu1pAW565A-PtYW1Hze2wV2hq8p';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialStateRegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    avatar: '',
    phone: 0,
  };

  const [inputs, setInputs] = useState<InputsUserType>(
    initialStateRegisterForm
  );
  const [inputSecretWord, setInputSecretWord] = useState<SecretWordType>({
    secretWord: '',
  });
  const [formRegistration, setFormRegistration] = useState<boolean>(false);
  const [message, setMessage] = useState<SecretWordType>({ secretWord: '' });

  const handlerClose = () => {
    setFormRegistration(false);
  };

  const handlerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [avatarFile, setAvatarFile] = useState();

  const changeAvatarHandler = (e) => {
    console.log(e.target.files[0]);
  };

  const sendFile = async () => {
    const data = new FormData();
    if (avatarFile) {
      data.append('avatar', avatarFile);
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/image`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      console.log(response);
    }
  };

  useEffect(() => {
    // sendFile();
    console.log(avatarFile);
  }, [avatarFile]);

  const handlerChangeSecretWord = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputSecretWord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerSendMessage = async (): Promise<void> => {
    axios
      .post(`${import.meta.env.VITE_URL}/user/message`, inputs, {
        withCredentials: true,
      })
      .then((res) => setMessage(res.data.secretWord))
      .catch((error) => console.log(error));
    setFormRegistration(true);
  };
  console.log(message);

  const handlerRegister = async (): Promise<void> => {
    if (String(message) === inputSecretWord.secretWord) {
      console.log('success!');
      dispatch(fetchRegisterUser(inputs))
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            console.log('THIS IS RES', res);
            navigate('/');
            sendFile();
          }
        })
        .catch((error) => console.log(error));
      setFormRegistration(false);
    } else {
      console.log('missed!');
      navigate('/');
      setFormRegistration(false);
    }
  };

  return (
    <div className='authContainer'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& > :not(style)': { m: 1 },
        }}
      >
        <TextField
          label='Ваше имя'
          type='text'
          name='firstName'
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          label='Ваша фамилия'
          type='text'
          name='lastName'
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          label='Контактный номер телефона'
          type='text'
          name='phone'
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          label='Email'
          helperText='Ваша почта должна быть уникальна'
          type='text'
          name='email'
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <TextField
          type='password'
          name='password'
          // id="demo-helper-text-aligned"
          label='Пароль'
          onChange={(e) => void handlerChange(e)}
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TextField
            disabled
            helperText='Вы можете загрузить аватар'
            type='text'
            name='avatar'
            value={avatarFile?.name}
            onChange={(e) => void handlerChange(e)}
            sx={{
              width: '340px',
              maxWidth: '100%',
            }}
          />
          <Button
            sx={{
              width: '160px',
              height: '55px',
              maxWidth: '100%',
              textAlign: 'center',
            }}
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
          >
            Загрузить аватар
            <VisuallyHiddenInput
              type='file'
              name='avatar'
              accept='image/png, image/jpeg, image/jpg'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                void setAvatarFile(e.target.files[0])
              }
            />
          </Button>
        </Box>
        <div>
          <ReCAPTCHA sitekey='6LfClZApAAAAAHWVRUGDt1nEt451W4Le8kHU_7lN' />
        </div>
        <Button
          variant='contained'
          color='success'
          onClick={() => void handlerSendMessage()}
        >
          Регистрация
        </Button>
        <Button variant='contained' onClick={() => setIsLogin(true)}>
          Уже зарегистрированы? Войти
        </Button>
        {formRegistration ? (
          <>
            <Dialog
              open={formRegistration}
              onClose={() => void handlerClose()}
              PaperProps={{
                component: 'form',
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  void handlerChangeSecretWord(e),
              }}
            >
              <DialogTitle>Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Для завершения регистрации, необходимо подтвердить
                  код-подтверждения, отправленный на электронную почту "
                  {inputs.email}".
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin='dense'
                  id='name'
                  name='secretWord'
                  label='Введите код-подтверждения'
                  type='text'
                  fullWidth
                  variant='standard'
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => void handlerClose()}>Cancel</Button>
                <Button onClick={() => void handlerRegister()}>
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : null}
      </Box>
    </div>
  );
}
