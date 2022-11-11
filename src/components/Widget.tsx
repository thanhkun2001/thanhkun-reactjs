import  React ,{ReactChild} from 'react';

export interface WidgetProps {
    title:string
    children?:any
}

export default function Widget ({title,children}: WidgetProps) {
  return (
    <div>
      <p>{title}</p>
      <div>{children}</div>
    </div>
  );
}
