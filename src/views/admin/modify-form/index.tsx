import { ReactNode, useCallback, useEffect, useId, useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Button } from '@/components/common/buttons';
import { Dropdown } from '@/components/common/dropdown';
import { Checkbox } from '@/components/common/form/checkbox';
import { Input } from '@/components/common/form/input';

import { Form, QuestionType } from '@/api/form/types/server-response';
import { supabase } from '@/api/supabase';
import { useAdminContext } from '@/provider/admin/context';
import { debounce } from '@/utils/debounce';

import styles from './index.module.css';

const inputType: { [key in QuestionType]: { display: string; element: ReactNode } } = {
  number: { display: '숫자', element: <NumberQuestion /> },
  text: { display: '단답형', element: <TextQuestion /> },
  checkbox: { display: '체크박스', element: <CheckboxOrRadioQuestion /> },
  radio: { display: '객관식', element: <CheckboxOrRadioQuestion /> },
  radioNumber: { display: '객관식 그리드', element: <RadioNumberQuestion /> },
  radioWithInput: { display: '객관식 선택 및 기타', element: <RadioWithInputQuestion /> },
};

function NumberQuestion() {
  return <Input type='number' />;
}

function TextQuestion() {
  return <Input readOnly />;
}

function CheckboxOrRadioQuestion() {
  return (
    <>
      <Input type='text' />
      <Input type='text' />
      <Input type='text' />
      <button>+</button>
    </>
  );
}

function RadioNumberQuestion() {
  return <></>;
}
function RadioWithInputQuestion() {
  return <></>;
}

const defaultNewQuestion = (): Form => ({
  name: crypto.randomUUID(),
  placeholder: '',
  question: '',
  required: false,
  type: 'text',
  validate: [],
});

const ModifyFormPage = () => {
  const { id } = useParams();
  const { formList, getFormList } = useAdminContext();
  const [isInputFocus, setInputFocus] = useState(false);
  // const [formData, setFormData] = useState(formList?.filter((form) => String(form.id) === id)[0]);
  const formData = useMemo(() => formList?.filter((form) => String(form.id) === id)[0], [formList]);

  const addQuestion = async () => {
    if (!formData) return;

    await supabase
      .from('form')
      .update({ forms: [...formData.forms, defaultNewQuestion()] })
      .eq('id', formData.id);

    await getFormList();
  };

  const handleRemoveQuestion = useCallback(
    async (questionName: Form['name']) => {
      if (!formData) return;

      await supabase
        .from('form')
        .update({ forms: formData.forms.filter((form) => form.name !== questionName) })
        .eq('id', formData.id);

      await getFormList();
    },
    [formData, supabase, getFormList],
  );

  const handleQuestionRequire = useCallback(
    async (questionName: Form['name'], currentCheckState: Form['required']) => {
      if (!formData) return;

      const targetQuestionIdx = formData.forms.findIndex((form) => form.name === questionName);
      formData.forms[targetQuestionIdx].required = !currentCheckState;

      await supabase.from('form').update({ forms: formData.forms }).eq('id', formData.id);
      await getFormList();
    },
    [formData, supabase, getFormList],
  );

  const handleChangeQuestionType = useCallback(
    async (questionName: Form['name'], wantToChangeType: Form['type']) => {
      if (!formData) return;

      const targetQuestionIdx = formData.forms.findIndex((form) => form.name === questionName);
      formData.forms[targetQuestionIdx].type = wantToChangeType;

      await supabase.from('form').update({ forms: formData.forms }).eq('id', formData.id);
      await getFormList();
    },
    [formData, supabase, getFormList],
  );

  const handleInputSave = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const questionNameOrTitle: Form['name'] | 'title' = event.target.name;
    const wantToUpdateText = event.target.value;

    if (!formData) return;

    if (questionNameOrTitle === 'title') {
      formData.title = wantToUpdateText;
    } else {
      const targetQuestionIdx = formData.forms.findIndex((form) => form.name === questionNameOrTitle);
      formData.forms[targetQuestionIdx].question = wantToUpdateText;
    }

    await supabase.from('form').update(formData).eq('id', formData.id);
    await getFormList();
  }, 1000);

  return (
    <>
      <Input name='title' placeholder='설문지 제목' defaultValue={formData?.title} onChange={handleInputSave} />
      {formData?.forms.map((form, idx) => (
        <QuestionContainer
          key={`${form.name}`}
          onRemove={handleRemoveQuestion}
          onChangeType={handleChangeQuestionType}
          onRequired={handleQuestionRequire}
          onTextInputChange={handleInputSave}
          {...form}
        />
      ))}
      <Button.BlueBg onClick={addQuestion}>+</Button.BlueBg>
    </>
  );
};

export default ModifyFormPage;

function QuestionContainer({
  type,
  question,
  required,
  validate,
  name,
  onRemove,
  onChangeType,
  onRequired,
  onTextInputChange,
}: Form & {
  onRemove: (quistionId: Form['name']) => void;
  onChangeType: (questionName: Form['name'], wantToChangeType: Form['type']) => void;
  onRequired: (questionName: Form['name'], currentCheckState: Form['required']) => void;
  onTextInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const handleRemove = () => {
    onRemove(name);
  };

  return (
    <div className={styles['question-container']}>
      <div className={styles['flex']}>
        <Input
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
