import { ChangeEvent, useState } from 'react';

import Form from '@/components/form/form';
import { isMultiInputAnswer, makeUserAnswerState } from '@/components/form/utils';

import type { Form as TForm } from '@/api/types/response';

const FormList = ({ forms }: { forms: TForm[] }) => {
  const [userAnswers, setUserAnswers] = useState(makeUserAnswerState(forms));

  const handleUserAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    let targetUserAnswer = userAnswers[targetName];

    if (targetUserAnswer === undefined) throw new Error('name이 없습니다.');

    if (isMultiInputAnswer(targetUserAnswer.value)) {
      targetUserAnswer = {
        ...targetUserAnswer,
        value: { checked: !targetUserAnswer.value.checked, value: targetValue },
      };
      setUserAnswers((prev) => ({ ...prev, [targetName]: targetUserAnswer }));
    } else {
      setUserAnswers((prev) => ({ ...prev, [targetName]: { ...targetUserAnswer, value: targetValue } }));
    }
  };

  return (
    <>
      {forms.map((form) => (
        <Form key={form.name} {...{ form }} onChange={handleUserAnswer} userAnswer={userAnswers[form.name]} />
      ))}
      <button>다음</button>
    </>
  );
};

export default FormList;
