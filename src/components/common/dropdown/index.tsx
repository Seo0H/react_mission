import { DropdownProvider } from './context';
import { Item } from './item';
import { Trigger } from './trigger';

export const Dropdown = DropdownProvider as typeof DropdownProvider & {
  Trigger: typeof Trigger;
  Item: typeof Item;
};

Dropdown.Trigger = Trigger;
Dropdown.Item = Item;
