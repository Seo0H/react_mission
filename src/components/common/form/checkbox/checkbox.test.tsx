import { render } from '@testing-library/react';

import { Checkbox } from '@/components/common/form/checkbox';

test('Checkbox의 value, id, name 및 추가 props가 적절히 전달되고 props에 맞는 기능이 작동해야 한다.', () => {
  const utils = render(<Checkbox value='test' id='id' name='name' data-testid='checkbox' />);

  let checkbox = utils.getByTestId('checkbox');

  expect(checkbox).toHaveAttribute('value', 'test');
  expect(checkbox).toHaveAttribute('id', 'id');
  expect(checkbox).toHaveAttribute('name', 'name');

  utils.rerender(<Checkbox isDisabled data-testid='checkbox' />);

  checkbox = utils.getByTestId('checkbox');

  expect(checkbox).toBeDisabled();
});
