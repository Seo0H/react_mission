import { regex } from '@/utils/regex';

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './constants';

export const validateSignUpInput = (email: string, password: string, name: string) => {
  if (!email || !password || !name) {
    return { error: '양식을 모두 채워주세요.' };
  }

  if (!regex.email.test(email)) {
    return { error: '이메일 형식에 알맞게 작성해주세요.' };
  }

  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    return { error: `비밀번호는 ${PASSWORD_MIN_LENGTH}글자 이상, ${PASSWORD_MAX_LENGTH}글자 이하로 입력해주세요.` };
  }

  return null;
};

export const isPathInclude = (patterns: string[], path: string) => {
  const regexPatterns = patterns.map((pattern) => {
    // '*'를 '.*'로 변환하고, 슬래시가 경로의 시작임을 알리기 위해 '^'를 추가
    const regexPattern = pattern.replace('*', '.*');
    return new RegExp(`^${regexPattern}$`);
  });

  return regexPatterns.some((regex) => regex.test(path));
};
