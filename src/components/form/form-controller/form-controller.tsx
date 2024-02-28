import { useCallback } from 'react';

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

  // NOTE: form의 기본 enter 이벤트로 인해 커스텀 enter 이벤트와 겹치는 문제가 있었음.
  // 따라서 form 대신 div 를 사용하고 enter 이벤트의 경우  onsubmit 처리를 해 줌
  const handleKeyDown = useCallback(() => {
    if (isLastQuestion) {
      onSubmit();
    } else {
      changeNextQuestion();
    }
  }, [changeNextQuestion]);

  const buttonKey = isLastQuestion ? 'submit' : 'next';
  const buttonHandler = isLastQuestion ? onSubmit : changeNextQuestion;
  return (
    <>
      <div className={styles['progress-bar-wrapper']}>
        <ProgressBar visuals={[{ color: globalColor.mainColor, percentage }]} />
      </div>

      <section className={styles['form-container']}>
        <label htmlFor={name} className={`${styles['label']} ${required && styles['required']}`}>
          {question}
        </label>

        <div className={styles['input-wrapper']}>
          <ConditionalInput key={form.name} selections={form.radioContext} {...rest} {...form} />

          <div className={styles['invalid-message-wrapper']}>{invalid && <ErrorMessage error={error?.message} />}</div>
        </div>

        <div className={styles['btn-wrapper']}>
          <Button key={buttonKey} onClick={buttonHandler}>
            {isLastQuestion ? 'SUBMIT' : `OK >`}
          </Button>
          <PressEnter enterCallback={handleKeyDown} />
        </div>
      </section>
    </>
  );
};
