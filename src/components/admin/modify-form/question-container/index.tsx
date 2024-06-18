import { Button } from '@/components/common/buttons';
import { Dropdown } from '@/components/common/dropdown';
import { Checkbox } from '@/components/common/form/checkbox';
import { Input } from '@/components/common/form/input';

import { Form } from '@/api/form/types/server-response';

import { inputType } from '../form-questions';
import { useModifyForm } from '../use-modify-form';

import styles from './index.module.css';

export function QuestionContainer({
  type,
  question,
  required,
  validate,
  name,
  onRemove,
  onChangeType,
  onRequired,
  onTextInputChange,
}: Form & Omit<ReturnType<typeof useModifyForm>, 'addQuestion'>) {
  const handleRemove = () => {
    onRemove(name);
  };

  return (
    <div className={styles['question-container']}>
      <div className={styles['flex']}>
        <Input
          key={name}
          name={name}
          placeholder='질문'
          className={styles.input}
          defaultValue={question}
          onChange={onTextInputChange}
        />

        <Dropdown defaultValue={type} value={type} name={`type`} onChange={(type) => onChangeType(name, type)}>
          <Dropdown.Trigger>{inputType[type].display}</Dropdown.Trigger>

          <div>
            {(Object.keys(inputType) as Array<keyof typeof inputType>).map((type) => (
              <Dropdown.Item key={type} value={type}>
                {inputType[type].display}
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown>
      </div>

      <div>
        <label className={styles['question-required-label']}>필수 질문</label>
        <Checkbox name={`required`} checked={required} onChange={() => onRequired(name, required)} />
      </div>

      {inputType[type].element}

      <Button.SmallNoBg onClick={handleRemove}>질문 삭제</Button.SmallNoBg>
    </div>
  );
}
