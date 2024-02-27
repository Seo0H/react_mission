import { EnterableLink } from '@/components/link/enterable-link';

import * as Contents from './constants';

export const HomeLink = () => {
  return <EnterableLink url='/' contents={Contents.link} />;
};
