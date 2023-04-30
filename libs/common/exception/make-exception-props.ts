import { ErrorLevel } from '../enum/basic.enum';
import { ExceptionProp } from '../type/exception.type';

export const makeExceptionProperty = (title: string, message: string, raw: Error, level: ErrorLevel): ExceptionProp => {
    return {
        title,
        message,
        raw,
        level,
    };
};
