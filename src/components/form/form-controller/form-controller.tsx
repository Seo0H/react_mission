import { useFormSubmit } from '@/components/form/form-controller/use-form-control';
import { useFormQuestionControl } from '@/components/form/form-controller/use-form-question-number';
import { FormQuestion } from '@/components/form/question/question';

import styles from './form-controller.module.css';

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
