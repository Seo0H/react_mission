import { ToastAlert } from '@/components/common/toast';

import { LanguagesContents } from '@/hooks/use-language/type';

export const ErrorTost = ({ errorMessages }: { errorMessages: LanguagesContents[] }) => {
  return <ToastAlert heading={heading} sub={errorMessages} pointColor='red' />;
};

const heading: LanguagesContents = {
  ko: '문제가 발생했어요.',
  en: 'Something Wrong..',
};
