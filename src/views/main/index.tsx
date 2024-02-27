import { useNavigate } from 'react-router-dom';

import { Link } from '@/components/common/link';

import PressEnter from '@/components/press-enter/press-enter';
import { useLanguage } from '@/hooks/use-language/use-language';
import { mainPageContents } from '@/views/main/constants';

import styles from './main.module.css';

const MainPage = () => {
  const { lang, langParams } = useLanguage();
  const navigate = useNavigate();
  const url = `/question/common?${langParams}`;

  return (
    <>
      <div className={styles['h1-wrapper']}>
        <h1>{mainPageContents[lang]}</h1>
      </div>

      <div className={styles['start-btn-container']}>
        <Link to={url} className={styles['start-btn']}>
          Start
        </Link>
        <PressEnter enterCallback={() => navigate(url)} />
      </div>
    </>
  );
};

export default MainPage;
