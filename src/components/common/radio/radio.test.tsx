import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Radio } from '@/components/common/radio/radio';
import { RadioGroup } from '@/components/common/radio/radio-group';

describe('Radio', () => {
  it('전달된 prop이 컴포넌트에 의도한대로 적용되어야 한다. ', () => {
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

describe('RadioGroup', () => {
  it('전달된 prop이 컴포넌트에 의도한대로 적용되어야 한다.', () => {
    const utils = render(
      <RadioGroup defaultValue='b'>
        <Radio value='a'>a</Radio>
        <Radio value='b'>b</Radio>
      </RadioGroup>,
    );

    expect(utils.getByLabelText('b')).toBeChecked();

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

    utils.rerender(<Component />);

    const [firstRadio, secondRadio, thirdRadio] = utils.getAllByTestId('input');

    expect(firstRadio).toBeDisabled();
    expect(secondRadio).toBeDisabled();
    expect(thirdRadio).not.toBeDisabled();
  });
});
