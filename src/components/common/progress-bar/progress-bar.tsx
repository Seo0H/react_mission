import { useEffect, useState } from 'react';

import { ClientForm } from '@/constants/client-types';

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
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(visuals.map((item) => item.percentage));
    });
  }, [visuals]);

  return (
    <div className={styles['visual-full']} style={{ backgroundColor }}>
      {visuals.map((item, index) => {
        // map each part into separate div and each will be animated
        // because of the "transition: width 2s;" css in class "progressVisualPart"
        // and because of the new width ("widths[index]", previous one was 0)
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
