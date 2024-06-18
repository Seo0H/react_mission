import { Button } from '@/components/common/buttons';
import { Input } from '@/components/common/form/input';

import { Tables } from '@/types/supabase';

import { QuestionContainer } from './question-container';
import { useModifyForm } from './use-modify-form';

export const ModifyFormContainer = ({ formData }: { formData: Tables<'form'> }) => {
  const { addQuestion, ...handlers } = useModifyForm(formData);
  return (
    <>
      <Input
        name='title'
        placeholder='설문지 제목'
        defaultValue={formData?.title}
        onChange={handlers.onTextInputChange}
      />
      {formData?.forms.map((form, idx) => <QuestionContainer key={`${form.name}`} {...handlers} {...form} />)}
      <Button.BlueBg onClick={addQuestion}>+</Button.BlueBg>
    </>
  );
};
