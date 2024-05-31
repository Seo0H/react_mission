import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/buttons';
import { Input } from '@/components/common/form/input';

import { useAuthContext } from '@/hooks/use-auth/auth-context';

type SignUpInfo = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
};

const LoginPage = () => {
  const { session, signIn, loginWithPassword } = useAuthContext();
  const [isSignUpMod, setSignUpMode] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({ email: '', password: '', passwordCheck: '', name: '' });
  const navigator = useNavigate();

  const handelSignUpInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handelSignIn = () => {
    const { email, password, name } = signUpInfo;
    signIn(email, password, name);
  };

  const handelLogin = () => {
    const { email, password } = signUpInfo;
    loginWithPassword(email, password).then(() => navigator('/'));
  };

  if (!session) {
    return (
      <div>
        {isSignUpMod && (
          <>
            <label>이름</label>
            <Input
              name='name'
              type='text'
              placeholder='이름을 입력해 주세요.'
              onChange={handelSignUpInfoChange}
              value={signUpInfo.name}
            />
          </>
        )}

        <label>아이디 (이메일)</label>
        <Input
          key='email'
          name='email'
          type='email'
          placeholder='example@example.com'
          onChange={handelSignUpInfoChange}
          value={signUpInfo.email}
        />

        <label>비밀번호</label>
        <Input name='password' type='password' onChange={handelSignUpInfoChange} value={signUpInfo.password} />

        {/* TODO: 회원가입 시 이메일, 비번 정규식 및 일치 확인 기능 */}
        {/* {isSignUpMod && (
          <>
            <label>비밀번호 확인</label>
            <Input name='passwordCheck' type='password' onChange={handelSignUpInfoChange} />
          </>
        )} */}

        {isSignUpMod && <Button.BlueBg onClick={handelSignIn}>회원 가입</Button.BlueBg>}
        {!isSignUpMod && <Button.BlueBg onClick={handelLogin}>로그인</Button.BlueBg>}
        {isSignUpMod && <Button.SmallNoBg onClick={() => setSignUpMode(false)}>돌아가기</Button.SmallNoBg>}

        {!isSignUpMod && (
          <>
            {/* TODO: 아이디, 비번 찾기 기능 구현 */}
            {/* <Button.SmallNoBg>아이디 찾기</Button.SmallNoBg> */}
            {/* <Button.SmallNoBg>비밀번호 찾기</Button.SmallNoBg> */}
            <Button.SmallNoBg onClick={() => setSignUpMode(true)}>회원 가입</Button.SmallNoBg>
          </>
        )}
      </div>
    );
  }
};

export default LoginPage;
