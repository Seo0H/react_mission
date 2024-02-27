import { Link } from 'react-router-dom';

import { LanguageSelector } from '@/components/lang/lang-selector';

import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles['header-wrapper']}>
      <Link to='/' className={styles['logo-wrapper']}>
        Logo
      </Link>
      <LanguageSelector />
    </header>
  );
};

export default Header;
