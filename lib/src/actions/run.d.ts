import { IProject } from '../types';
export declare const runBlock: (background: boolean, project: IProject, index: number) => Promise<void>;
export declare const run: (block: string, background: boolean) => Promise<void>;
