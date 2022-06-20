import React, {MouseEventHandler, PropsWithChildren} from "react";
import {Color} from "../properties";

export const Button: React.FC<PropsWithChildren<{
  type?: 'submit' | 'button',
  color?: Color,
  disabled?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  className?: string,
}>> = (props) => {
  const color = props.color || 'primary';
  const disabled = props.disabled || false;
  return (
    <button
      type={props.type}
      className={`text-white font-bold py-2 px-4 rounded-xl whitespace-nowrap border-4 btn-${color} ${props.className}`}
      disabled={disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
};
