export interface UseRadioProps {
  name?: string;
  id?: string;
  value?: string;
  defaultChecked?: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioState {
  isChecked: boolean;
  isDisabled: boolean | undefined;
  isRequired: boolean | undefined;
}
