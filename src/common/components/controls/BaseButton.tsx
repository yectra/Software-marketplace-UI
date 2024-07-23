import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Icon from '@mui/material/Icon';

interface BaseButtonProps extends Omit<ButtonProps, 'color'> {
  id?: string;
  name?: string;
  icon?: string;
  color?: string;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  id,
  name,
  variant,
  color = "#0C9DBD",
  className,
  onClick,
  disabled = false,
  icon,
  marginTop,
  marginLeft,
  marginRight,
  ...props
}) => {
  return (
    <Button
      id={id}
      variant={variant}
      style={{ 
        backgroundColor: variant === 'contained' ? color : undefined, 
        color: variant !== 'contained' ? color : undefined,
        marginTop,
        marginLeft,
        marginRight,
      }}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {name && <span>{name}</span>}
      {icon && <Icon>{icon}</Icon>}
    </Button>
  );
};

export default BaseButton;
