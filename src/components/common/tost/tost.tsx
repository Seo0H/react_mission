import { useEffect, useId, useState } from 'react';

import { Portal } from '@/components/common/potal';
import * as Text from '@/components/common/text/text';

import { useLanguageContext } from '@/hooks/use-language/language-context';
import { LanguagesContents } from '@/hooks/use-language/type';

import styles from './tost.module.css';

interface TostAlertProps {
  pointColor?: string;
  heading: LanguagesContents;
  sub: LanguagesContents[];
  shownTime?: number;
  onUnmount?: () => void;
}

export const TostAlert = ({
  heading,
  sub,
  pointColor = 'var(--main-color)',
  onUnmount,
  shownTime = 1000,
}: TostAlertProps) => {
  const { lang } = useLanguageContext();
  const id = useId();
  const [effect, setEffect] = useState(styles.show);

  useEffect(() => {
    const timer = setTimeout(() => {
      onUnmount?.();
      setEffect(styles.close);
    }, shownTime);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Portal>
      <div className={`${styles['tost-container']} ${effect}`}>
        <div className={styles['tost-point-line']} style={{ backgroundColor: pointColor }} />
        <Text.H2>{heading[lang]}</Text.H2>
        {sub.map((context, idx) => (
          <Text.Text key={`${id}-${idx}`}>{context[lang]}</Text.Text>
        ))}
      </div>
    </Portal>
  );
};
