import React from 'react';
import * as icons from '@/shared/assets/icons';

export type IconName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    className?: string;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
    const IconComponent = icons[name];

    if (!IconComponent) {
        console.warn(`[Icon component]: Иконка с именем "${name}" не найдена в shared/assets/icons`);
        return null;
    }

    return <IconComponent className={className} {...props} />;
};