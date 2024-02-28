import { validateField } from '@/hooks/use-form/logic/validate-field';
import { Validate } from '@/hooks/use-form/types/validator';

describe('validate-field util function', () => {
  describe('type: not', () => {
    it('target이 string 일 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'not',
          target: 'test',
          validateText: 'test는 허용되지 않습니다.',
        },
      ];

      const error = await validateField(mockValidate, 'test', { test: 'test' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });
    });

    it('target이 number 일 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'not',
          target: 10,
          validateText: '10은 허용되지 않습니다.',
        },
      ];

      const error = await validateField(mockValidate, 'test', { test: 10 });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });
    });

    it('target이 object 일 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'not',
          target: { test: 'test' },
          validateText: "{ test: 'test'} 형식은 허용되지 않습니다.",
        },
      ];

      const error = await validateField(mockValidate, 'test', { test: { test: 'test' } });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });
    });
  });

  describe('type: minmax', () => {
    it('최소값이 없고 최대값만 주어진 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'minMax',
          target: ['-', 5],
          validateText: '5 이하의 값만 허용됩니다..',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: 6 });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 5 });
      expect(error).toStrictEqual({});
    });

    it('최대값이 없고 최소값만 주어진 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'minMax',
          target: [5, '-'],
          validateText: '5 이상의 값만 허용됩니다.',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: 4 });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 5 });
      expect(error).toStrictEqual({});
    });

    it('최대값, 최소값만 둘다 주어진 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'minMax',
          target: [3, 7],
          validateText: '3이상, 7이하의 값만 허용됩니다.',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: 2 });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 8 });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });
    });
  });

  describe('type: sameAs', () => {
    it('target이 특정 값인 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'sameAs',
          target: 'test',
          validateText: '값은 test와 같아야 합니다.',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: 'wrong' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 'test' });
      expect(error).toStrictEqual({});
    });

    it('target이 특정 필드의 이름인 경우 (target이 $기호로 시작하는 경우)', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'sameAs',
          target: '$something',
          validateText: '값은 something 필드와 같아야 합니다.',
        },
      ];

      let error = await validateField(mockValidate, 'test', { something: '1', test: '2' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { something: '1', test: '1' });
      expect(error).toStrictEqual({});
    });

    it('target에 -(제한없음)값이 주어진 경우 ', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'sameAs',
          target: '-',
          validateText: '',
        },
      ];

      const error = await validateField(mockValidate, 'test', { test: '-' });
      expect(error).toStrictEqual({});
    });
  });

  describe('type: minMaxLength', () => {
    it('최소값이 없고 최대값만 주어진 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'minMaxLength',
          target: ['-', 5],
          validateText: '길이 5 이하의 값만 허용됩니다.',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: 'test validateField' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 'test' });
      expect(error).toStrictEqual({});
    });

    it('최대값이 없고 최소값만 주어진 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'minMaxLength',
          target: [5, '-'],
          validateText: '길이 5 이상의 값만 허용됩니다.',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: 'test' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 'test validateField' });
      expect(error).toStrictEqual({});
    });

    it('최대값, 최소값만 둘다 주어진 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'minMaxLength',
          target: [3, 7],
          validateText: '길이 3 이상 5이하의 값만 허용됩니다.',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: '1' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 'test validateField' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 'test' });
      expect(error).toStrictEqual({});
    });
  });

  describe('type: pattern', () => {
    it('이메일 판별 정규표현식이 주어진 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'pattern',
          target:
            '^([\\w\\.\\_\\-])*[a-zA-Z0-9]+([\\w\\.\\_\\-])*([a-zA-Z0-9])+([\\w\\.\\_\\-])+@([a-zA-Z0-9]+\\.)+[a-zA-Z0-9]{2,8}$',
          validateText: '이메일 형식으로 입력해주세요',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: 'test' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: 'test@email.com' });
      expect(error).toStrictEqual({});
    });

    it('전화번호 판별 정규표현식이 주어진 경우', async () => {
      const mockValidate: Validate[] = [
        {
          type: 'pattern',
          target: '^(\\d{2,3}-\\d{3,4}-\\d{4})$',
          validateText: '전화번호 형식으로 입력해주세요',
        },
      ];

      let error = await validateField(mockValidate, 'test', { test: 'test' });
      expect(error).toStrictEqual({ test: { message: [mockValidate[0].validateText] } });

      error = await validateField(mockValidate, 'test', { test: '010-1234-5678' });
      expect(error).toStrictEqual({});
    });
  });

  it('다중 에러 메시지 처리가 되어야 한다.', async () => {
    const mockValidate: Validate[] = [
      {
        type: 'minMaxLength',
        target: [5, '-'],
        validateText: '5글자 이상이여야 합니다.',
      },
      {
        type: 'not',
        target: 'test',
        validateText: 'test를 입력하면 안됩니다.',
      },
    ];

    const error = await validateField(mockValidate, 'test', { test: 'test' });

    expect(error).toStrictEqual({ test: { message: ['test를 입력하면 안됩니다.', '5글자 이상이여야 합니다.'] } });
  });
});
