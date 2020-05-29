interface ITabConsole {
    type: 'console';
    value: string;
}
interface ITabCode {
    type: 'code';
    path: string;
    value: string;
}
declare type ITab = ITabConsole | ITabCode;
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
export declare type IInputTextBox = 'string';
export declare type IInputCheckbox = 'boolean';
export declare type IOption = string | [string, string];
export declare type IInputRadio = {
    0: IOption;
    1: IOption;
};
export declare type IInputSelect = {
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
declare type options = {
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
export declare type IForm = IInput | IRadio | ISelect | ICheckbox | ITextarea;
export {};
