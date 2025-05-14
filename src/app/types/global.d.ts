declare module '*.scss' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

declare module '*.css' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
    import type React from 'react';
  
    interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
      size?: number;
    }
  
    const SVG: React.FC<SVGIconProps>;
    export default SVG;
  }
