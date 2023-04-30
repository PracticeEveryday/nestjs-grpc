import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RouterCategory } from '../enum/basic.enum';

type RouterProps = {
    path?: string;
    tag: {
        category?: RouterCategory;
        title: string;
    };
};

export const RouteTable = ({ path = '', tag }: RouterProps) => {
    const conditionDecorator: (ClassDecorator | MethodDecorator | PropertyDecorator)[] = [];

    return applyDecorators(
        ...conditionDecorator,
        Controller(path),
        ApiTags(
            `${(() => {
                switch (tag?.category) {
                    case RouterCategory.PRIVATE:
                        return '[비공개]';
                    case RouterCategory.PUBLIC:
                        return '[공개]';
                    case RouterCategory.VIRTURE:
                        return '[개발용]';
                    default:
                        return '';
                }
            })()} ${tag.title}`
        )
    );
};
