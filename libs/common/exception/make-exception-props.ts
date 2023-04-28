import { ExceptionProp } from '../type/exception.type';

export const makeExceptionProperty = (title: string, message: string, raw: Error, level: 'warn' | 'error'): ExceptionProp => {
    return {
        title,
        message,
        raw,
        level,
    };
};
