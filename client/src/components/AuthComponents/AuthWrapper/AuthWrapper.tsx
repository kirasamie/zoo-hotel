import { useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

export default function AuthWrapper(): JSX.Element {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />;
}
