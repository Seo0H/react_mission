import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/buttons';

import { useAuthContext } from '@/hooks/use-auth/auth-context';

import { LoginForm, SignUpForm } from './components';

const LoginPage = () => {
  const { session } = useAuthContext();
  const [isSignUpMod, setSignUpMode] = useState(false);
  const navigator = useNavigate();

  if (!session) {
    return (
      <div style={{ width: '100%' }}>
        {isSignUpMod ? (
          <>
            <SignUpForm />
            <Button.SmallNoBg onClick={() => setSignUpMode(false)}>돌아가기</Button.SmallNoBg>
          </>
        ) : (
          <>
            <LoginForm />
            <Button.SmallNoBg onClick={() => setSignUpMode(true)}>회원 가입</Button.SmallNoBg>
            {/* <Button.SmallNoBg>아이디 찾기</Button.SmallNoBg> */}
            {/* <Button.SmallNoBg>비밀번호 찾기</Button.SmallNoBg> */}
          </>
        )}
      </div>
    );
  }

  // 이미 로그인된 사용자의 경우 아무것도 렌더링하지 않거나 다른 컴포넌트를 렌더링합니다.
  navigator('/');
};

export default LoginPage;
