import React, { ComponentProps } from 'react';
import { Control } from 'react-hook-form';

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  control: Control;
}

function TextBox(props: IProps) {
  const { children, ...rest } = props;
  return <div>TextBox</div>;
}

export default TextBox;
