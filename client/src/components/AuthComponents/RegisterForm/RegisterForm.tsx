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
import { Button, TextField, Box, styled, InputAdornment } from '@mui/material';
import GlassWrapper from '../../GlassWrapper/GlassWrapper';
import StyledTextfield from '../../GlassWrapper/StyledTextfield';
import StyledButton from '../../GlassWrapper/StyledButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function validateEmail(email: string) {
  return email.toLowerCase().match(/^[a-z/._/0-9]*[@][a-z]*[/.][a-z]{2,4}$/);
}

function validatePhoneNumber(phoneNumber: string) {
  return phoneNumber.match(
    /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',

  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export type InputsUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  phone: string;
};

export type ErrorMsgType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  captchaReponse: string;
};

export type SecretWordType = {
  secretWord: string;
};

export default function RegisterForm({ setIsLogin }): JSX.Element {
  const key = "6LdZkJApAAAAAGu1pAW565A-PtYW1Hze2wV2hq8p";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialStateRegisterForm = {

    firstName: '',
    lastName: '',
    email: '',
    password: '',
    avatar: '',
    phone: '',

  };

  const [inputs, setInputs] = useState<InputsUserType>(
    initialStateRegisterForm
  );
  const [inputSecretWord, setInputSecretWord] = useState<SecretWordType>({
    secretWord: "",
  });
  const [formRegistration, setFormRegistration] = useState<boolean>(false);

  const [showError, setShowError] = useState<ErrorMsgType>({});
  const [message, setMessage] = useState<SecretWordType>({ secretWord: '' });


  const handlerClose = () => {
    setFormRegistration(false);
  };

  const handlerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setShowError((prev) => ({ ...prev, [e.target.name]: '' }));
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

  const checkError = () => {
    const captchaResponse = grecaptcha.getResponse();
    const errorMsg = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      captchaReponse: '',
    };

    if (inputs.firstName.trim().length === 0) {
      errorMsg.firstName = 'Необходимо ввести ваше имя!';
    }
    if (inputs.lastName.trim().length === 0) {
      errorMsg.lastName = 'Необходимо ввести вашу фамилию!';
    }
    if (inputs.password.trim().length === 0) {
      errorMsg.password = 'Необходимо ввести ваш пароль!';
    }
    if (inputs.email.trim().length === 0) {
      errorMsg.email = 'Необходимо ввести ваш email!';
    }
    if (captchaResponse.length === 0) {
      errorMsg.captchaReponse = 'Необходимо пройти ReCaptcha!';
    }
    if (!validateEmail(inputs.email)) {
      errorMsg.email =
        'Ваш email необходимо ввести в формате example@example.com';
    }
    if (inputs?.phone.length === 0) {
      errorMsg.phone =
        'Необходимо ввести ваш номер в формате +7912345678 или 8912345678';
    }
    if (!validatePhoneNumber(inputs.phone)) {
      errorMsg.phone =
        'Необходимо ввести ваш номер в формате +7912345678 или 8912345678';
    }
    setShowError({ ...errorMsg });
    return Object.entries(errorMsg).some((el) => el[1].length !== 0);
  };

  const handlerSendMessage = async (): Promise<void> => {
    if (!checkError()) {
      axios
        .post(`${import.meta.env.VITE_URL}/user/message`, inputs, {
          withCredentials: true,
        })
        .then((res) => setMessage(res.data.secretWord))
        .catch((error) => console.log(error));
      setFormRegistration(true);
    }
  };
  console.log(message);

  const handlerRegister = async (): Promise<void> => {
    if (String(message) === inputSecretWord.secretWord) {
      console.log("success!");
      dispatch(fetchRegisterUser(inputs))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            console.log("THIS IS RES", res);
            navigate("/");
            sendFile();
          }
        })
        .catch((error) => console.log(error));
      setFormRegistration(false);
    } else {
      console.log("missed!");
      navigate("/");
      setFormRegistration(false);
    }
  };

  return (
    <div className='authContainer'>
      <GlassWrapper width='600px'>
        <StyledTextfield
          error={!!showError.firstName}
          helperText={showError.firstName}
          label='Ваше имя'
          type='text'
          name='firstName'
          onChange={(e) => void handlerChange(e)}
        />
        <StyledTextfield
          error={!!showError.lastName}
          helperText={showError.lastName}
          label='Ваша фамилия'
          type='text'
          name='lastName'
          onChange={(e) => void handlerChange(e)}
        />
        <StyledTextfield
          error={!!showError.phone}
          helperText={showError.phone}
          label='Контактный номер телефона'
          sx={{
            color: 'white',
          }}
          type='text'
          name='phone'
          onChange={(e) => void handlerChange(e)}
        />
        <StyledTextfield
          error={!!showError.email}
          helperText={showError.email}
          label='Email'
          type='text'
          name='email'
          onChange={(e) => void handlerChange(e)}
        />
        <StyledTextfield
          error={!!showError.password}
          helperText={showError.password}
          label='Пароль'
          type='password'
          name='password'
          onChange={(e) => void handlerChange(e)}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            width: '100%',
          }}
        >
          <StyledTextfield
            disabled
            type='text'
            name='avatar'
            value={avatarFile?.name || 'Файл не выбран'}
            onChange={(e) => void handlerChange(e)}
          />
          <StyledButton
            sx={{ width: '300px' }}
            component='label'
            role={undefined}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            disableElevation
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
          </StyledButton>
        </div>
        <div style={{ color: '#d32f2f' }}>
          <ReCAPTCHA
            theme='dark'
            sitekey='6LfClZApAAAAAHWVRUGDt1nEt451W4Le8kHU_7lN'
          />
          {showError.captchaReponse}
        </div>
        <StyledButton color='success' onClick={() => void handlerSendMessage()}>
          Регистрация
        </StyledButton>
        <StyledButton onClick={() => setIsLogin(true)}>
          Уже зарегистрированы? Войти
        </StyledButton>
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
      </GlassWrapper>
    </div>
  );
}
