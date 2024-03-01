/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useId } from 'react';

import { Button } from '@/components/common/buttons';
import ErrorMessage from '@/components/common/error/message';
import { Radio } from '@/components/common/form/radio';
import { ProgressBar } from '@/components/common/progress-bar/progress-bar';

import { ConditionalInput } from '@/components/form';
import PressEnter from '@/components/press-enter/press-enter';
import { ErrorTost } from '@/components/toast/error';
import { useFormContext } from '@/hooks/use-form/form-context';
import { useLanguageContext } from '@/hooks/use-language/language-context';
import { LanguagesContents } from '@/hooks/use-language/type';
import { globalColor } from '@/style/css-variable';
import { debounce } from '@/utils/debounce';

import styles from './form-controller.module.css';
import { useFormQuestionControl } from './hooks/use-form-question-controll';
import { useFormSubmit } from './hooks/use-form-submit';

const requiredMessage: LanguagesContents = { ko: '필수 질문입니다.', en: 'This is an essential question.' };

export const FormController = () => {
  const { lang } = useLanguageContext();
  const { forms, isLastQuestion, nextQuestion, beforeQuestion, resetIdx, percentage, currentIdx } =
    useFormQuestionControl();
  const { onSubmit, submitStatus } = useFormSubmit({ cleanUp: resetIdx });
  const { getFieldState } = useFormContext();
  const id = useId();

  // NOTE: form의 기본 enter 이벤트로 인해 커스텀 enter 이벤트와 겹치는 문제가 있었음.
  // 따라서 form 대신 div 를 사용하고 enter 이벤트의 경우  onsubmit 처리를 해 줌
  const handleKeyDown = debounce(() => {
    if (isLastQuestion) {
      onSubmit();
    } else {
      nextQuestion();
    }
  });

  const buttonKey = isLastQuestion ? 'submit' : 'next';
  const buttonHandler = isLastQuestion ? onSubmit : nextQuestion;
  return (
    <>
      {submitStatus.isError && <ErrorTost errorMessages={[{ ko: submitStatus.message, en: submitStatus.message }]} />}

      <div className={styles['progress-bar-wrapper']}>
        <ProgressBar visuals={[{ color: globalColor.mainColor, percentage }]} />
      </div>
      {/* NOTE:  질문이 dom에서 아예 사라지면  이전 답변이 남지 않기에 map을
          이용해 전체 질문을 펼치고 display를 이용해 보여주는 방식 사용 */}
      {forms.map((form, idx) => {
        const { name, question, required, ...rest } = form;
        const { invalid, error } = getFieldState(name);

        return (
          <section
            key={`${idx}-${id}`}
            className={styles['form-container']}
            style={{ display: idx === currentIdx ? 'block' : 'none' }}
          >
            <label htmlFor={name} className={`${styles['label']} ${required && styles['required']}`}>
              {question}
            </label>
            <div className={styles['input-wrapper']}>
              <ConditionalInput
                key={form.name}
                selections={form.radioContext}
                requiredMessage={requiredMessage[lang]}
                {...rest}
                {...form}
              />

              <div className={styles['invalid-message-wrapper']}>
                {invalid && <ErrorMessage error={error?.message} />}
              </div>
            </div>

            <div className={styles['btn-wrapper']}>
              <Button onClick={beforeQuestion} style={{ backgroundColor: `var(--gray-400)` }}>{`< Before`}</Button>
              <Button key={buttonKey} onClick={buttonHandler}>
                {isLastQuestion ? 'SUBMIT' : `OK >`}
              </Button>
              <PressEnter enterCallback={handleKeyDown} />
            </div>
          </section>
        );
      })}
    </>
  );
};
