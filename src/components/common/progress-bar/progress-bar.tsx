import { useEffect, useState } from 'react';

import styles from './progress-bar.module.css';

type Visual = {
  percentage: number;
  color: string;
};

export const ProgressBar = ({
  backgroundColor = '#e5e5e5',
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
    requestAnimationFrame(() => {
      setWidths(visuals.map((item) => item.percentage));
    });
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
