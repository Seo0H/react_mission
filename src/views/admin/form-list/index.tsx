import { useEffect } from 'react';

import { Button } from '@/components/common/buttons';
import { Link } from '@/components/common/link';

import { useAdminContext } from '@/provider/admin/context';

const FormListPage = () => {
  const { formList, getFormList, removeForm } = useAdminContext();

  useEffect(() => {
    const abortController = new AbortController();
    getFormList(abortController.signal);
    return () => abortController.abort();
  }, []);

  return (
    <>
      <h1>FORM LIST</h1>
      {formList?.map((form) => (
        <div key={`${form.id}-form`}>
          <Link.NoBgSmallText to={`/admin/modify-form/${form.id}`}>{form.title}</Link.NoBgSmallText>
          <Button.SmallNoBg onClick={() => removeForm(form.id)}>삭제</Button.SmallNoBg>
        </div>
      ))}
    </>
  );
};

export default FormListPage;
