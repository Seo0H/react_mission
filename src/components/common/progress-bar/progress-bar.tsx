import { useEffect, useState } from 'react';

import styles from './progress-bar.module.css';

type Visual = {
  percentage: number;
  color: string;
};

export const ProgressBar = ({
  backgroundColor = 'var(--gray-200)',
  visuals = [
    {
      percentage: 0,
      color: 'white',
    },
  ],
}: {
  backgroundColor?: string;
  visuals: Visual[];
}) => {
  const [widths, setWidths] = useState(visuals.map(() => 0));

  useEffect(() => {
    // NOTE: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // 부드러운 애니메이션을 위한 최적화 . js가 프레임 시작 시 실행되도록 보장하기 위함.
    const animationId = requestAnimationFrame(() => {
      setWidths(visuals.map((item) => item.percentage));
    });
    return () => cancelAnimationFrame(animationId);
  }, [visuals]);

  return (
    <div className={styles['visual-full']} style={{ backgroundColor }}>
      {visuals.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              width: `${widths[index]}%`,
              backgroundColor: item.color,
            }}
            className={styles['progress-visual']}
          />
        );
      })}
    </div>
  );
};
