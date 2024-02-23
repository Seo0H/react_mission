import { render } from '@testing-library/react';

import { Radio } from '@/components/common/form/radio/radio';
import { RadioGroup } from '@/components/common/form/radio/radio-group';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('RadioGroup 컴포넌트 테스트', () => {
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
