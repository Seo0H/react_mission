import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Checkbox, CheckBoxGroup } from '@/components/common/form/checkbox';

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
