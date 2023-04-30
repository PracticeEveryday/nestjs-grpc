import { ErrorLevel } from '../enum/basic.enum';

export type ExceptionProp = {
    title: string;
    message: string;
    raw: Error;
    level: ErrorLevel;
};
