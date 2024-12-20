declare module '*.jpg';
declare module '*.png';
declare module '*.woff2';
declare module '*.woff';
declare module '*.ttf';

declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const content: string;
  export default content;
}
