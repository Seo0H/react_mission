import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/buttons';

import { useAuthContext } from '@/hooks/use-auth/auth-context';

import { LoginForm, SignUpForm } from './components';
import styles from './login.module.css';

const LoginPage = () => {
  const { session } = useAuthContext();
  const [isSignUpMode, setSignUpMode] = useState(false);
  const navigator = useNavigate();

  const modeChanger = (
    <Button.SmallNoBg onClick={() => setSignUpMode(!isSignUpMode)} className={styles['mode-changer-btn']}>
      {isSignUpMode ? '돌아가기' : '회원가입'}
    </Button.SmallNoBg>
  );

  if (!session) {
    return (
      <div className={styles['login-page-container']}>
        {isSignUpMode ? <SignUpForm {...{ modeChanger }} /> : <LoginForm {...{ modeChanger }} />}

        {/* <Button.SmallNoBg>아이디 찾기</Button.SmallNoBg> */}
        {/* <Button.SmallNoBg>비밀번호 찾기</Button.SmallNoBg> */}
      </div>
    );
  }

  // 이미 로그인된 사용자의 경우 아무것도 렌더링하지 않거나 다른 컴포넌트를 렌더링
  navigator('/');
};

export default LoginPage;
