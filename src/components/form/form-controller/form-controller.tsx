import { FormQuestion } from '@/components/form';

import styles from './form-controller.module.css';
import { useFormSubmit } from './hooks/use-form-control';
import { useFormQuestionControl } from './hooks/use-form-question-number';

export const FormController = () => {
  const { isLastQuestion, handleClick, handleKeyDown, resetIdx, form } = useFormQuestionControl();
  const { onSubmit } = useFormSubmit({ cleanUp: resetIdx });
  const buttonType = isLastQuestion ? 'submit' : 'button';

  return (
    <form onSubmit={onSubmit} onKeyDown={handleKeyDown} className={styles['form-container']}>
      <FormQuestion {...{ form }} />

      <button key={buttonType} type={buttonType} onClick={handleClick}>
        {isLastQuestion ? `제출` : `다음`}
      </button>
    </form>
  );
};
