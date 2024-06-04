import { Link } from '@/components/common/link';

import styles from './admin-header.module.css';

const AdminHeader = () => {
  return (
    <div className={styles['admin-header-container']}>
      <Link.NoBgSmallText to='/admin/form-list'>폼 리스트</Link.NoBgSmallText>
      <Link.NoBgSmallText to='/admin/create-form'>폼 만들기</Link.NoBgSmallText>
    </div>
  );
};

export default AdminHeader;
