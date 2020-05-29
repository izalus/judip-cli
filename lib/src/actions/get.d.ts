import { IInputs, IDetails, IForm } from '../types';
export declare const getInputs: (inputs: IInputs, details: IDetails) => IForm[];
export declare const get: (recipe: string) => Promise<void>;
