import { useState } from 'react';

import { Button } from '@/components/common/buttons';
import { Input } from '@/components/common/form/input';
import { InputWithLabel } from '@/components/common/form/input/input-with-label';

import { useAuthContext } from '@/hooks/use-auth/auth-context';
import { InvalidateMessage } from '@/views/login/components/invalidate';

import type { SignInData } from '../types';

export const SignUpForm = ({ modeChanger }: { modeChanger: React.ReactNode }) => {
  const { signIn } = useAuthContext();
  const [signUpData, setSignUpData] = useState<SignInData>({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  });

  const handleSignUpInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSignUp = async () => {
    const { email, password, name } = signUpData;
    const result = await signIn(email, password, name);

    if (result?.error) {
      setSignUpData((prev) => ({ ...prev, invalidatedMessage: result.error }));
    }
  };

  return (
    <>
      <InputWithLabel
        label='이름'
        name='name'
        type='text'
        placeholder='이름을 입력해 주세요.'
        onChange={handleSignUpInfoChange}
        value={signUpData.name}
      />
      <InputWithLabel
        label='아이디 (이메일)'
        name='email'
        type='email'
        placeholder='example@example.com'
        onChange={handleSignUpInfoChange}
        value={signUpData.email}
      />
      <InputWithLabel
        label='비밀번호'
        name='password'
        type='password'
        onChange={handleSignUpInfoChange}
        value={signUpData.password}
      />

      {/* <label>비밀번호 확인</label>
      <Input name='passwordCheck' type='password' onChange={handleSignUpInfoChange} value={signUpData.passwordCheck} /> */}
      <InvalidateMessage>{signUpData?.invalidatedMessage && signUpData.invalidatedMessage}</InvalidateMessage>

      <div>
        <Button.BlueBg onClick={handleSignUp}>회원 가입</Button.BlueBg>
        {modeChanger}
      </div>
    </>
  );
};
