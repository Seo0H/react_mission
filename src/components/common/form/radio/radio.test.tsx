import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Radio } from '@/components/common/form/radio/radio';
import { RadioGroup } from '@/components/common/form/radio/radio-group';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Radio : 전달된 prop이 컴포넌트에 의도한대로 적용되어야 한다.', () => {
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
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: document.createElement('button') });
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

describe('RadioGroup : 전달된 prop이 컴포넌트에 의도한대로 적용되어야 한다.', () => {
  it('defaultValue prop 작동 테스트', () => {
    const utils = render(
      <RadioGroup defaultValue='b'>
        <Radio value='a'>a</Radio>
        <Radio value='b'>b</Radio>
      </RadioGroup>,
    );

    expect(utils.getByLabelText('b')).toBeChecked();
  });
  it('disabled prop 작동 테스트', () => {
    // disabled test
    const Component = () => (
      <RadioGroup isDisabled>
        <Radio value='one' data-testid='input'>
          One
        </Radio>
        <Radio value='two' isDisabled data-testid='input'>
          Two
        </Radio>
        <Radio value='three' isDisabled={false} data-testid='input'>
          Three
        </Radio>
      </RadioGroup>
    );

    const utils = render(<Component />);

    const [firstRadio, secondRadio, thirdRadio] = utils.getAllByTestId('input');

    expect(firstRadio).toBeDisabled();
    expect(secondRadio).toBeDisabled();
    expect(thirdRadio).not.toBeDisabled();
  });
});
