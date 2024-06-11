import { useEffect } from 'react';

import { Link } from '@/components/common/link';

import { useAdminContext } from '@/provider/admin/context';

const FormListPage = () => {
  const { formList, getFormList } = useAdminContext();

  useEffect(() => {
    const abortController = new AbortController();
    getFormList(abortController.signal);
    return () => abortController.abort();
  }, []);

  return (
    <>
      <h1>FORM LIST</h1>
      {formList?.map((form) => (
        <Link.NoBgSmallText key={`${form.id}-form`} to={`/admin/modify-form/${form.id}`}>
          {form.title}
        </Link.NoBgSmallText>
      ))}
    </>
  );
};

export default FormListPage;
