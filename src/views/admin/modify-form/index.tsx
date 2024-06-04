import { useParams } from 'react-router-dom';

import { useAdminContext } from '../../../provider/admin/context';

const ModifyForm = () => {
  const { id } = useParams();
  const { formList } = useAdminContext();
  const data = formList?.filter((form) => String(form.id) === id)[0];

  return (
    <>
      <div>modify</div>
      {data && (
        <>
          <h1>{data.title}</h1>
        </>
      )}
    </>
  );
};

export default ModifyForm;
