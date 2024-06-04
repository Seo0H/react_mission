import { Link } from '@/components/common/link';

import { useAdminContext } from '@/provider/admin/context';

const FormListPage = () => {
  const { formList } = useAdminContext();

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
