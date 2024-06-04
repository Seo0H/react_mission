import { ComponentProps } from "react";

export type TDropdownContext = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedValue: string;
    setSelectValue: (newValue: string) => void;
  };
  
  export type DropdownProps = {
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
  } & Omit<ComponentProps<'div'>, 'onChange'>;
  