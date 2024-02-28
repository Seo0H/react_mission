import React from 'react';

import { createPortal } from 'react-dom';

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) throw new Error('portal-root가 존재하지 않습니다.');
  return createPortal(children, portalRoot);
};
