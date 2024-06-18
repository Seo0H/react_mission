import { useCallback } from 'react';

import { Form } from '@/api/form/types/server-response';
import { supabase } from '@/api/supabase';
import { useAdminContext } from '@/provider/admin/context';
import { Tables } from '@/types/supabase';
import { debounce } from '@/utils/debounce';

const defaultNewQuestion = (): Form => ({
  name: crypto.randomUUID(),
  placeholder: '',
  question: '',
  required: false,
  type: 'text',
  validate: [],
});

export function useModifyForm(formData: Tables<'form'>) {
  const { getFormList } = useAdminContext();

  const _updateFormData = useCallback(
    async (updatedForms: Tables<'form'>['forms']) => {
      if (!formData) return;

      await supabase.from('form').update({ forms: updatedForms }).eq('id', formData.id);

      await getFormList();
    },
    [formData, getFormList],
  );

  const addQuestion = useCallback(async () => {
    if (!formData) return;

    const updatedForms = [...formData.forms, defaultNewQuestion()];
    await _updateFormData(updatedForms);
  }, [formData, _updateFormData]);

  const handleRemoveQuestion = useCallback(
    async (questionName: Form['name']) => {
      if (!formData) return;

      const updatedForms = formData.forms.filter((form) => form.name !== questionName);
      await _updateFormData(updatedForms);
    },
    [formData, _updateFormData],
  );

  const handleQuestionRequire = useCallback(
    async (questionName: Form['name'], currentCheckState: Form['required']) => {
      if (!formData) return;

      const updatedForms = formData.forms.map((form) =>
        form.name === questionName ? { ...form, required: !currentCheckState } : form,
      );
      await _updateFormData(updatedForms);
    },
    [formData, _updateFormData],
  );

  const handleChangeQuestionType = useCallback(
    async (questionName: Form['name'], wantToChangeType: Form['type']) => {
      if (!formData) return;

      const updatedForms = formData.forms.map((form) =>
        form.name === questionName ? { ...form, type: wantToChangeType } : form,
      );
      await _updateFormData(updatedForms);
    },
    [formData, _updateFormData],
  );

  const handleInputSave = useCallback(
    debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
      const questionNameOrTitle: Form['name'] | 'title' = event.target.name;
      const wantToUpdateText = event.target.value;

      if (!formData) return;

      const updatedForms = formData.forms.map((form) =>
        form.name === questionNameOrTitle ? { ...form, question: wantToUpdateText } : form,
      );

      const updatedFormData =
        questionNameOrTitle === 'title'
          ? { ...formData, title: wantToUpdateText }
          : { ...formData, forms: updatedForms };

      await supabase.from('form').update(updatedFormData).eq('id', formData.id);
      await getFormList();
    }, 1000),
    [formData, supabase, getFormList],
  );

  return {
    addQuestion,
    onRemove: handleRemoveQuestion,
    onRequired: handleQuestionRequire,
    onChangeType: handleChangeQuestionType,
    onTextInputChange: handleInputSave,
  };
}
