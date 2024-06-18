import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/buttons';
import { Link } from '@/components/common/link';

import { supabase } from '@/api/supabase';
import { useAdminContext } from '@/provider/admin/context';

import { createDefaultQuestion } from '../modify-form/constants/default-question';

import styles from './admin-header.module.css';

const AdminHeader = () => {
  const navigator = useNavigate();
  const { getFormList } = useAdminContext();
  const createForm = async () => {
    const { data, error, status } = await supabase
      .from('form')
      .insert({
        title: '제목 없는 설문지.',
        forms: [createDefaultQuestion()],
      })
      .select();

    await getFormList();

    if (error) {
      alert(`폼 생성 중 에러가 발생했습니다. 콘솔을 확인 해 주세요. / STATUS CODE : ${status}`);
      console.error(error);
      return;
    }

    navigator(`/admin/modify-form/${data[0].id}`);
  };
  return (
    <div className={styles['admin-header-container']}>
      <Link.NoBgSmallText to='/admin/form-list'>폼 리스트</Link.NoBgSmallText>
      <Button.BlueBg onClick={createForm}>폼 만들기 +</Button.BlueBg>
    </div>
  );
};

export default AdminHeader;
