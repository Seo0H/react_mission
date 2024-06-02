import { useState } from 'react';

import { Button } from '@/components/common/buttons';
import { Input } from '@/components/common/form/input';

import { useAuthContext } from '@/hooks/use-auth/auth-context';
import { regex } from '@/utils/regex';

import type { SignInData } from '../types';

export const SignUpForm = () => {
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
      <label>이름</label>
      <Input
        name='name'
        type='text'
        placeholder='이름을 입력해 주세요.'
        onChange={handleSignUpInfoChange}
        value={signUpData.name}
      />

      <label>아이디 (이메일)</label>
      <Input
        name='email'
        type='email'
        placeholder='example@example.com'
        onChange={handleSignUpInfoChange}
        value={signUpData.email}
      />

      <label>비밀번호</label>
      <Input name='password' type='password' onChange={handleSignUpInfoChange} value={signUpData.password} />

      {/* <label>비밀번호 확인</label>
      <Input name='passwordCheck' type='password' onChange={handleSignUpInfoChange} value={signUpData.passwordCheck} /> */}
      {signUpData?.invalidatedMessage && <p>{signUpData.invalidatedMessage}</p>}

      <Button.BlueBg onClick={handleSignUp}>회원 가입</Button.BlueBg>
    </>
  );
};
