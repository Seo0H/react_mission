import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { Radio } from '@/components/common/form/radio/radio';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Radio 컴포넌트 테스트', () => {
  it('name, value, id prop test', () => {
    const utils = render(<Radio name='name' value='' id='id' data-testid='input' />);

    let input = utils.getByTestId('input');

    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('id', 'id');
    expect(input).toHaveAttribute('value', '');
    expect(input).not.toBeDisabled();

    utils.rerender(<Radio isChecked isDisabled isRequired data-testid='input' />);

    input = utils.getByTestId('input');

    expect(input).toBeDisabled();
    expect(input).toBeChecked();
    expect(input).toBeRequired();
  });
});

describe('Radio 동작 테스트', () => {
  it('제어 테스트', async () => {
    const mock = jest.fn();

    const Component = () => (
      <Radio value='one' data-testid='input' onClick={mock}>
        One
      </Radio>
    );

    const utils = render(<Component />);
    const input = await utils.findByTestId('input');

    fireEvent.click(input);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('비제어 테스트', async () => {
    const mock = jest.fn();

    const Component = () => (
      <Radio value='one' ref={mock}>
        One
      </Radio>
    );

    render(<Component />);

    const one = await screen.getByLabelText('One');

    fireEvent.click(one);

    expect(one).toBeChecked();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
