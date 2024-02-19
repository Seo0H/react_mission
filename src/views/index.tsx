import { useLoaderData } from 'react-router';

import { FormAPIResponseType } from '@/api/types/response';
import FormList from '@/components/form/form-list';

const App = () => {
  const { data } = useLoaderData() as FormAPIResponseType;

  return (
    <>
      <FormList forms={data.forms} />
    </>
  );
};

export default App;
