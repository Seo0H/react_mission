import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/buttons';
import { InputWithLabel } from '@/components/common/form/input/input-with-label';

import { useAuthContext } from '@/hooks/use-auth/auth-context';
import { InvalidateMessage } from '@/views/login/components/invalidate';

import styles from './login.module.css';
import type { LoginData } from '../types';

export const LoginForm = ({ modeChanger }: { modeChanger: React.ReactNode }) => {
  const { loginWithPassword } = useAuthContext();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });

  const handleLoginInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleLogin = async () => {
    const data = await loginWithPassword(loginData.email, loginData.password);
    if (data?.error) {
      setLoginData((prev) => ({ ...prev, invalidatedMessage: data.error }));
    } else navigate('/');
  };

  return (
    <>
      <InputWithLabel
        label='아이디 (이메일)'
        name='email'
        type='email'
        placeholder='example@example.com'
        onChange={handleLoginInfoChange}
        value={loginData.email}
      />

      <InputWithLabel
        label='비밀번호'
        name='password'
        type='password'
        onChange={handleLoginInfoChange}
        value={loginData.password}
      />

      <InvalidateMessage>{loginData?.invalidatedMessage && loginData.invalidatedMessage}</InvalidateMessage>

      <div>
        <Button.BlueBg onClick={handleLogin}>로그인</Button.BlueBg>
        {modeChanger}
      </div>
    </>
  );
};
