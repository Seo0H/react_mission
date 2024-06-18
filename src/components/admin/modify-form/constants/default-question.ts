import { Form } from '@/api/form/types/server-response';

export const createDefaultQuestion = (): Form => ({
  name: crypto.randomUUID(),
  placeholder: '',
  question: '',
  required: false,
  type: 'text',
  validate: [],
});
