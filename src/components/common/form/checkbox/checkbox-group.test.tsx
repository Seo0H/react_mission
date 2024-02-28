import { fireEvent, render, screen } from '@testing-library/react';

import { CheckBoxGroup, Checkbox } from '@/components/common/form/checkbox';

const runTest = () => {
  const one = screen.getByLabelText('One');
  const two = screen.getByLabelText('Two');
  const three = screen.getByLabelText('Three');

  expect(one).toBeChecked();
  expect(two).not.toBeChecked();
  expect(three).not.toBeChecked();

  fireEvent.click(two);

  expect(one).toBeChecked();
  expect(two).toBeChecked();
  expect(three).not.toBeChecked();
};

describe('Checkbox Group', () => {
  test('체크박스 그룹에서 초기값 적용, 다중 선택이 되어야 한다.', async () => {
    const onChange = jest.fn();
    render(
      <CheckBoxGroup name='checkbox' defaultValue={['1']} onChange={onChange}>
        <Checkbox value='1'>One</Checkbox>
        <Checkbox value='2'>Two</Checkbox>
        <Checkbox value='3'>Three</Checkbox>
      </CheckBoxGroup>,
    );

    runTest();
    expect(onChange.mock.lastCall[0].target.value).toBe('2'); // to be receive event
  });
});
