interface ITabConsole {
  type: 'console';
  value: string;
}

interface ITabCode {
  type: 'code';
  path: string;
  value: string;
}

type ITab = ITabConsole | ITabCode;

export interface ICodeBlock {
  name: string;
  recipe: string;
  id: number;
  tabs: ITab[];
  outputs: object;
  logs: string;
}

export interface IProject {
  name: string;
  id: string;
  count: number;
  blocks: ICodeBlock[];
}

export type IInputTextBox = 'string';
export type IInputCheckbox = 'boolean';
export type IOption = string | [string, string];
export type IInputRadio = {
  0: IOption;
  1: IOption;
};
export type IInputSelect = {
  0: IOption;
  1: IOption;
  2: IOption;
} & IOption[];

export interface IInputs {
  [key: string]: IInputTextBox | IInputCheckbox | IInputRadio | IInputSelect;
}

export interface IDetail {
  element?: 'input' | 'textarea';
  placeholder?: string;
  label?: string;
  value?: string | boolean;
  optional?: boolean;
}

export interface IDetails {
  [key: string]: IDetail;
}

interface IInput {
  element: 'input';
  type: 'text' | 'number';
  name: string;
  label: string;
  value: string;
  optional?: boolean;
  placeholder?: string;
}

type options = {
  0: string;
  1: string;
  2: string;
} & string[];

interface ISelect {
  element: 'select';
  optionLabels: options;
  options: options;
  name: string;
  label: string;
  value: string;
  optional?: boolean;
}

interface IRadio {
  element: 'radio';
  optionLabels: [string, string];
  options: [string, string];
  name: string;
  label: string;
  value: string;
  optional?: boolean;
}

interface ICheckbox {
  element: 'checkbox';
  name: string;
  label: string;
  value: boolean;
  optional?: boolean;
}

interface ITextarea {
  element: 'textarea';
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  optional?: boolean;
}

export type IForm = IInput | IRadio | ISelect | ICheckbox | ITextarea;
