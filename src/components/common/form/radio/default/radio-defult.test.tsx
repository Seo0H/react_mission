import { useState, type ChangeEvent } from 'react';

import { fireEvent, render } from '@testing-library/react';

import { DefaultRadio } from '@/components/common/form/radio/default/radio-default';
import type { QuestionContext } from '@/components/common/form/type';

const mockQuestions: QuestionContext[] = [
  {
    label: '하나',
    value: 'one',
  },
  {
    label: '둘',
    value: 'two',
  },
];

describe('Default Radio', () => {
  it('제어 상태일때 컴포넌트가 의도한대로 작동해야 한다,', () => {
    const Component = () => {
      const [currentValues, setCurrentValues] = useState('one');

      const mockChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValues(e.target.value);
      };

      return <DefaultRadio contexts={mockQuestions} name='test' value={currentValues} onChange={mockChangeHandler} />;
    };

    const utils = render(<Component />);
    const one = utils.getByLabelText('하나');
    const two = utils.getByLabelText('둘');

    expect(one).toBeChecked();
    expect(two).not.toBeChecked();

    fireEvent.click(two);

    expect(one).not.toBeChecked();
    expect(two).toBeChecked();
  });

  it('비제어 상태일때 컴포넌트가 의도한대로 작동해야 한다,', () => {
    const mockRef = jest.fn();
    const utils = render(<DefaultRadio contexts={mockQuestions} name='test' ref={mockRef} defaultCheckedValue='one' />);

    let one = utils.getByLabelText('하나');
    let two = utils.getByLabelText('둘');

    expect(one).toBeChecked();
    expect(two).not.toBeChecked();

    mockRef.mockClear();
    fireEvent.click(two);

    one = utils.getByLabelText('하나');
    two = utils.getByLabelText('둘');

    expect(two).toBeChecked();
    expect(mockRef).toHaveBeenCalledTimes(1);
  });
});
