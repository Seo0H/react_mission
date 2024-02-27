import { Button } from '@/components/common/buttons';
import ErrorMessage from '@/components/common/error/message';
import { ProgressBar } from '@/components/common/progress-bar/progress-bar';

import { ConditionalInput } from '@/components/form';
import PressEnter from '@/components/press-enter/press-enter';
import { useFormContext } from '@/hooks/use-form/form-context';
import { globalColor } from '@/style/css-variable';

import styles from './form-controller.module.css';
import { useFormQuestionControl } from './hooks/use-form-question-controll';
import { useFormSubmit } from './hooks/use-form-submit';

export const FormController = () => {
  const { isLastQuestion, changeNextQuestion, resetIdx, form, percentage } = useFormQuestionControl();
  const { onSubmit } = useFormSubmit({ cleanUp: resetIdx });
  const { getFieldState } = useFormContext();

  const { name, question, required, ...rest } = form;

  const { invalid, error } = getFieldState(name);
  const buttonType = isLastQuestion ? 'submit' : 'button';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter') {
      !isLastQuestion && e.preventDefault();
      changeNextQuestion();
    }
  };

  return (
    <>
      <div className={styles['progress-bar-wrapper']}>
        <ProgressBar visuals={[{ color: globalColor.mainColor, percentage }]} />
      </div>

      <form onSubmit={onSubmit} className={styles['form-container']} onKeyDown={handleKeyDown}>
        <label htmlFor={name} className={`${styles['label']} ${required && styles['required']}`}>
          {question}
        </label>

        <div className={styles['input-wrapper']}>
          <ConditionalInput key={form.name} selections={form.radioContext} {...rest} {...form} />

          <div className={styles['invalid-message-wrapper']}>{invalid && <ErrorMessage error={error?.message} />}</div>
        </div>

        <div className={styles['btn-wrapper']}>
          <Button key={buttonType} type={buttonType} onClick={changeNextQuestion}>
            {isLastQuestion ? `SUBMIT` : `OK >`}
          </Button>
          <PressEnter />
        </div>
      </form>
    </>
  );
};
