import { classNames } from 'shared/lib/classNames/classNames'

import cls from './Icon.module.scss';
import { SVGProps, memo } from 'react';
import { IconTheme } from './Icon.types';

interface IconProps extends SVGProps<SVGSVGElement> {
  Svg: React.FC<SVGProps<SVGSVGElement>>;
  size?: number;
  iconTheme?: IconTheme;
}

export const Icon = memo(({Svg, size = 24, iconTheme = 'accent', ...restProps}: IconProps) => {

  return (
    <Svg
        className={classNames(cls.icon, {[cls[iconTheme]]: iconTheme})}
        width={size}
        height={size}
        {...restProps}
    />
  );
});