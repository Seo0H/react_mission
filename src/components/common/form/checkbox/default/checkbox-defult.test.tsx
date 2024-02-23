import { ChangeEvent, useState } from 'react';

import { fireEvent, render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { DefaultCheckbox } from '@/components/common/form/checkbox/default/checkbox-defult';
import { QuestionContext } from '@/components/common/form/type';

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

describe('DefaultCheckbox 동작 테스트', () => {
  it('제어 상태일일때 컴포넌트가 의도한대로 작동해야 한다.', () => {
    const Component = () => {
      const [currentValues, setCurrentValues] = useState(['one']);

      const mockChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        if (currentValues.includes(targetValue))
          setCurrentValues(currentValues.filter((values) => values !== targetValue));
        else setCurrentValues([...currentValues, targetValue]);
      };

      return (
        <DefaultCheckbox contexts={mockQuestions} name='test' value={currentValues} onChange={mockChangeHandler} />
      );
    };

    const utils = render(<Component />);

    const one = utils.getByLabelText('하나');
    const two = utils.getByLabelText('둘');

    expect(one).toBeChecked();
    expect(two).not.toBeChecked();

    fireEvent.click(two);

    expect(two).toBeChecked();
  });

  it('비제어 상태일때 컴포넌트가 의도한대로 작동해야 한다.', () => {
    const mockRef = jest.fn();
    const utils = render(
      <DefaultCheckbox contexts={mockQuestions} name='test' ref={mockRef} defaultCheckedValues={['one']} />,
    );

    const one = utils.getByLabelText('하나');
    const two = utils.getByLabelText('둘');

    expect(one).toBeChecked();
    expect(two).not.toBeChecked();

    fireEvent.click(two);

    expect(two).toBeChecked();
    expect(mockRef).toHaveBeenCalledTimes(1);
  });
});
