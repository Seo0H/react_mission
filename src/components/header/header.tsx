import { Link } from 'react-router-dom';

import { Button } from '@/components/common/buttons';

import { LanguageSelector } from '@/components/lang/lang-selector';
import { useAuthContext } from '@/hooks/use-auth/auth-context';

import styles from './header.module.css';

const Header = () => {
  const { session, logout, userInfo } = useAuthContext();
  return (
    <header className={styles['header-wrapper']}>
      <Link to='/' className={styles['logo-wrapper']}>
        Logo
      </Link>

      <div className={styles['link-wrapper']}>
        <LanguageSelector />

        {session && (
          <>
            <Link to='/mypage'>내 정보</Link>
            {userInfo?.role === 'admin' && <Link to='/admin'>관리자 페이지</Link>}
            <Button.SmallNoBg onClick={logout}>로그아웃</Button.SmallNoBg>
          </>
        )}

        {!session && (
          <Link to='/login' style={{ cursor: 'pointer' }}>
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
