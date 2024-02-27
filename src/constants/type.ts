export interface Content<TContent extends string = string> {
  key: string;
  value?: TContent;
  visual: string;
}
