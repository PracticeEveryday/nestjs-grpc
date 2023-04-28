export type ExceptionProp = {
    title: string;
    message: string;
    raw: Error;
    level: 'warn' | 'error';
};
