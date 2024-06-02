import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/buttons';
import { Input } from '@/components/common/form/input';

import { useAuthContext } from '@/hooks/use-auth/auth-context';

import type { LoginData } from '../types';

export const LoginForm = () => {
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
      <label>아이디 (이메일)</label>
      <Input
        name='email'
        type='email'
        placeholder='example@example.com'
        onChange={handleLoginInfoChange}
        value={loginData.email}
      />
      <label>비밀번호</label>
      <Input name='password' type='password' onChange={handleLoginInfoChange} value={loginData.password} />

      {loginData?.invalidatedMessage && <p>{loginData.invalidatedMessage}</p>}

      <Button.BlueBg onClick={handleLogin}>로그인</Button.BlueBg>
    </>
  );
};
