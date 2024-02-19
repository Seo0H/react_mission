import { useLoaderData } from 'react-router';

import FormList from '@/components/form/form-list';

import type { ClientFormData } from '@/constants/client-types';

const App = () => {
  const { data } = useLoaderData() as { data: ClientFormData };

  return (
    <>
      <FormList forms={data.forms} />
    </>
  );
};

export default App;
