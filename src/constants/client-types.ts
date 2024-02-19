import type { FormData as ServerFormData, Selection, Form as ServerForm } from '@/api/types/server-response';

export interface ClientForm extends ServerForm {
  radioContext?: Selection[] | undefined;
  placeholder: string;
}

export interface ClientFormData extends ServerFormData {
  forms: ClientForm[];
}
