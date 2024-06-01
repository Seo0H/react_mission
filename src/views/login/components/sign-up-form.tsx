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
    const isEmpty = !email || !password || !name;
    const isPasswordLengthBetween6and12 = password.length >= 6 && password.length <= 12;
    const isEmailValidate = regex.email.test(email);

    if (isEmpty) {
      setSignUpData((prev) => ({ ...prev, invalidatedMessage: '양식을 모두 채워주세요.' }));
      return;
    }

    if (!isEmailValidate) {
      setSignUpData((prev) => ({ ...prev, invalidatedMessage: '이메일 형식에 알맞게 작성해주세요.' }));
      return;
    }

    if (!isPasswordLengthBetween6and12) {
      setSignUpData((prev) => ({ ...prev, invalidatedMessage: '비밀번호는 6글자 이상, 12글자 이하로 입력해주세요.' }));
      return;
    }

    const { error } = await signIn(email, password, name);

    if (error) {
      console.error(error);
      setSignUpData((prev) => ({
        ...prev,
        invalidatedMessage: '예측하지 못한 에러가 발생했습니다. 콘솔을 확인해주세요.',
      }));
      return;
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
