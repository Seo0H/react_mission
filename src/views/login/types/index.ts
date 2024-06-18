export type LoginData = {
  email: string;
  password: string;
  invalidatedMessage?: string;
};

export type SignInData = {
  passwordCheck: string;
  name: string;
} & LoginData;
