import { Button } from '@/components/common/buttons';
import ErrorMessage from '@/components/common/error/message';

import { ConditionalInput } from '@/components/form';
import { useFormContext } from '@/hooks/use-form/form-context';

import styles from './form-controller.module.css';
import { useFormSubmit } from './hooks/use-form-control';
import { useFormQuestionControl } from './hooks/use-form-question-number';

export const FormController = () => {
  const { isLastQuestion, handleClick, handleKeyDown, resetIdx, form } = useFormQuestionControl();
  const { onSubmit } = useFormSubmit({ cleanUp: resetIdx });
  const { getFieldState } = useFormContext();

  const { name, question, required, ...rest } = form;

  const { invalid, error } = getFieldState(name);
  const buttonType = isLastQuestion ? 'submit' : 'button';

  return (
    <form onSubmit={onSubmit} onKeyDown={handleKeyDown} className={styles['form-container']}>
      <label htmlFor={name} className={`${styles['label']} ${required && styles['required']}`}>
        {question}
      </label>

      <div className={styles['input-wrapper']}>
        <ConditionalInput key={form.name} selections={form.radioContext} {...rest} {...form} />

        <div className={styles['invalid-message-wrapper']}>{invalid && <ErrorMessage error={error?.message} />}</div>
      </div>

      <Button key={buttonType} type={buttonType} onClick={handleClick}>
        {isLastQuestion ? `제출` : `다음`}
      </Button>
    </form>
  );
};
