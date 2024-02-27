import { ReactElement, useId } from 'react';

import * as Text from '@/components/common/text/text';

import styles from './index.module.css';

interface HadingSubtitleLayoutProps {
  heading: string;
  sub: string[];
  button: ReactElement;
}
export const TitleSubtitleButtonLayout = ({ heading, sub, button }: HadingSubtitleLayoutProps) => {
  const id = useId();
  return (
    <>
      <div className={styles['heading-wrapper']}>
        <Text.H1>{heading}</Text.H1>
        {sub.map((text, idx) => (
          <Text.H2 key={`${id}-${idx}`}>{text}</Text.H2>
        ))}
      </div>

      <div className={styles['start-btn-container']}>{button}</div>
    </>
  );
};
