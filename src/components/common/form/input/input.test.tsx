import { ChangeEvent, useState } from 'react';

import { type RenderResult, fireEvent, render } from '@testing-library/react';

import { Input } from './input';

const runTest = (utils: RenderResult) => {
  let input = utils.getByTestId('input');
  expect(input).toHaveValue('test');

  fireEvent.change(input, { target: { value: '테스트' } });

  input = utils.getByTestId('input');
  expect(input).toHaveValue('테스트');
};

describe('Input Component', () => {
  it('제어 컴포넌트로 사용할 시 의도한대로 작동해야 한다.', () => {
    const Component = () => {
      const [value, setValue] = useState('test');

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };

      return <Input value={value} onChange={handleChange} data-testid='input' />;
    };

    const utils = render(<Component />);
    runTest(utils);
  });
  it('비제어 컴포넌트로 사용할 시 의도한대로 작동해야 한다.', () => {
    const mockRef = jest.fn();
    const utils = render(<Input defaultValue='test' ref={mockRef} data-testid='input' />);
    runTest(utils);
  });
});
