import React, { forwardRef, useState } from 'react';

import { fireEvent, render } from '@testing-library/react';

import { Dropdown } from '.';

const UncontrolledDropdown = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <Dropdown defaultValue='One' ref={ref}>
      <Dropdown.Trigger />
      {testTexts.map((text, idx) => (
        <Dropdown.Item key={`${idx}-${text}`} value={text}>
          {text}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
});

UncontrolledDropdown.displayName = 'UncontrolledDropdown';

function ControlledDropdown({ mockOnChange }: { mockOnChange: jest.Func }) {
  const [selectText, setSelectText] = useState(testTexts[0]);

  const handleOnChange = (select: string) => {
    mockOnChange(select);
    setSelectText(select);
  };

  return (
    <Dropdown defaultValue='One' onChange={handleOnChange}>
      <Dropdown.Trigger>{selectText}</Dropdown.Trigger>
      {testTexts.map((text, idx) => (
        <Dropdown.Item key={`${idx}-${text}`} value={text}>
          {text}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

const testTexts = ['One', 'Two', 'Three'];

describe('Dropdown', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('비제어모드로 사용할 수 있어야 한다', async () => {
    const ref = React.createRef<HTMLInputElement>();
    const utils = render(<UncontrolledDropdown ref={ref} />);

    let trigger = await utils.findByTestId('trigger');
    expect(trigger.textContent).toBe('One');

    fireEvent.click(trigger);
    const [one, two, three] = await utils.findAllByTestId('dropdown-item');
    fireEvent.click(two);
    trigger = await utils.findByTestId('trigger');

    expect(trigger.textContent).toBe('Two');
    expect(ref.current?.value).toBe('Two');
    // expect(useRefSpy.mock)
  });

  it('제어모드로 사용할 수 있어야 한다', async () => {
    const onChange = jest.fn();
    const utils = render(<ControlledDropdown mockOnChange={onChange} />);
    let trigger = await utils.findByTestId('trigger');
    expect(trigger.textContent).toBe('One');

    fireEvent.click(trigger);
    const [one, two, three] = await utils.findAllByTestId('dropdown-item');
    fireEvent.click(two);
    trigger = await utils.findByTestId('trigger');

    expect(trigger.textContent).toBe('Two');
    expect(onChange.mock.lastCall[0]).toBe('Two');
  });
});
