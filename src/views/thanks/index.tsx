import { Link } from '@/components/common/link';

import styles from './thanks.module.css';

const ThanksPage = () => {
  return (
    <div className={styles.layout}>
      <span>조사가 종료되었습니다.</span>
      <span>감사합니다.</span>
      <Link to='/'>처음으로</Link>
    </div>
  );
};

export default ThanksPage;
