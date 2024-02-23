export type OnChangeProp = string | React.ChangeEvent<HTMLInputElement>;

export type EventOrValue = React.ChangeEvent<HTMLInputElement> | string;

export type QuestionContext = { value: string; label: string };
