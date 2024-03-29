import type { FormData as ServerFormData, Selection, Form as ServerForm } from '@/api/form/types/server-response';

export interface ClientForm extends ServerForm {
  radioContext?: Selection[] | undefined;
  placeholder: string;
  requiredMessage?: string;
}

export interface ClientFormData extends ServerFormData {
  forms: ClientForm[];
}
