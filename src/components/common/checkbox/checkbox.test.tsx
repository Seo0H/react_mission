import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Checkbox from '@/components/common/checkbox/checkbox';
import CheckBoxGroup from '@/components/common/checkbox/checkbox-group';

test('Checkbox Test', () => {
  const utils = render(<Checkbox value='test' id='id' name='name' data-testid='checkbox' />);

  let checkbox = utils.getByTestId('checkbox');

  expect(checkbox).toHaveAttribute('value', 'test');
  expect(checkbox).toHaveAttribute('id', 'id');
  expect(checkbox).toHaveAttribute('name', 'name');

  utils.rerender(<Checkbox isDisabled data-testid='checkbox' />);

  checkbox = utils.getByTestId('checkbox');

  expect(checkbox).toBeDisabled();
});

test('Checkbox Group Test', async () => {
  const utils = render(
    <CheckBoxGroup isDisabled values={['two', 'three']}>
      <Checkbox data-testid='input' value='one'>
        One
      </Checkbox>
      <Checkbox data-testid='input' value='two'>
        Two
      </Checkbox>
      <Checkbox data-testid='input' value='three' isDisabled={false}>
        Three
      </Checkbox>
    </CheckBoxGroup>,
  );

  const [firstCheckbox, secondCheckbox, thirdCheckbox] = await utils.findAllByTestId('input');

  expect(firstCheckbox).not.toBeChecked();
  expect(secondCheckbox).toBeChecked();
  expect(thirdCheckbox).toBeChecked();

  expect(firstCheckbox).toBeDisabled();
  expect(secondCheckbox).toBeDisabled();
  expect(thirdCheckbox).not.toBeDisabled();
});
