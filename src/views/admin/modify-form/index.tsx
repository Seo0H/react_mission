import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { ModifyFormContainer } from '@/components/admin/modify-form';
import { useAdminContext } from '@/provider/admin/context';

const ModifyFormPage = () => {
  const { id } = useParams();
  const { formList } = useAdminContext();
  const formData = useMemo(() => formList?.filter((form) => String(form.id) === id)[0], [formList]);

  // TODO: 예외처리 추가
  if (!formData) return <>formData is empty</>;

  return <ModifyFormContainer {...{ formData }} />;
};

export default ModifyFormPage;
