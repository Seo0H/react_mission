import { ComponentProps } from "react";

export type TDropdownContext<SelectType> = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedValue: SelectType | null;
    setSelectValue: (newValue: SelectType) => void;
  };
  
export type DropdownProps<SelectType> = {
  defaultValue?: SelectType;
  value?: SelectType;
  onChange?: (value: SelectType) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;