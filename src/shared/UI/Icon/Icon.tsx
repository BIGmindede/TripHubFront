import { classNames } from 'shared/lib/classNames/classNames'

import cls from './Icon.module.scss';
import { SVGProps, memo } from 'react';
import { IconTheme } from './Icon.types';

interface IconProps extends SVGProps<SVGSVGElement> {
  Svg: React.FC<SVGProps<SVGSVGElement>>;
  size?: number;
  iconTheme?: IconTheme;
  className?: string;
}

export const Icon = memo(({Svg, size = 24, iconTheme = 'accent',  className, ...restProps}: IconProps) => {

  return (
    <Svg
        className={classNames(cls.icon, {[cls[iconTheme]]: iconTheme}, [className])}
        width={size}
        height={size}
        {...restProps}
    />
  );
});