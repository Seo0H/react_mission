import { isArray } from '@/utils/is';

import type { Placeholder as ServerPlaceHolder, Form as ServerForm, Selection } from '@/api/form/types/server-response';
import type { ClientForm } from '@/constants/client-form-type';

export function makeClientForm(serverFormList: ServerForm[]) {
  return serverFormList.map<ClientForm>((serverForm) => {
    if (isSelections(serverForm.placeholder)) {
      return {
        ...serverForm,
        placeholder: '',
        radioContext: serverForm.placeholder,
      };
    }
    return { ...serverForm, placeholder: serverForm.placeholder };
  });
}

function isSelections(serverPlaceHolder: ServerPlaceHolder): serverPlaceHolder is Selection[] {
  return isArray(serverPlaceHolder);
}
