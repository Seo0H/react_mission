import { formAPI } from '@/api/form';

export const loaders = {
  async mainPage() {
    try {
      return await formAPI.getCommonQuestion();
    } catch (e) {
      console.log(e);
      throw new Error('question data fetching 중 에러 발생');
    }
  },
};
