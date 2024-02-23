import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import { CheckBoxGroup, Checkbox } from '@/components/common/form/checkbox';

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
