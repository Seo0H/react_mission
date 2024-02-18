export interface CheckboxOptions {}

export interface CheckboxState {
  isChecked: boolean;
  isDisabled: boolean;
}

export interface UseCheckboxProps {
  /**
   * `true`인 경우 체크박스가 선택됩니다.
   * 값을 업데이트하려면 'onChange'를 전달해야 합니다(이제 제어되므로).
   *
   * @default false
   */
  isChecked?: boolean;

  /**
   * `true`인 경우 체크박스가 비활성화됩니다.
   *
   * @default false
   */
  isDisabled?: boolean;

  /**
   * `true`인 경우 check란은 읽기 전용이 됩니다.
   *
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * `true`인 경우 체크박스 입력이 필수로 표시되고, `required` 속성이 추가됩니다.
   *
   * @default false
   */
  isRequired?: boolean;

  /**
   * `true`인 경우 체크박스가 처음에 선택됩니다.
   *
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * '체크박스'의 선택 상태가 변경될 때 호출되는 콜백입니다.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 체크박스의 입력 필드 이름
   * (양식 제출에 유용합니다).
   */
  name?: string;

  /**
   * 체크박스 입력에 사용할 값입니다.
   * 양식 제출 시 반환되는 값입니다.
   */
  value?: string | number;

  /**
   * 입력에 할당되는 id 입니다.
   */
  id?: string;
}
