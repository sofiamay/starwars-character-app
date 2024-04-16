import { ReactNode } from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';
import type { ComponentProps } from 'react';
import { GoSync } from 'react-icons/go';

// extends ComponentProps<"div">
interface ButtonProps  {
  children?: ReactNode | undefined;
  type: 'primary'| 'secondary'| 'success' | 'warning' | 'danger',
  border?: 'outline' | 'rounded',
  loading?: boolean,
  [props: string]: any;
}

function Button(props: ButtonProps) {
  const { children, type, border, loading, ...rest } = props;

  const classes = className(
    rest.className,
    'flex items-center px-3 py-1.5 border h-8',
    {
      'opacity-80': loading,
      'border-blue-500 bg-blue-500 text-white': type === 'primary',
      'border-gray-900 bg-gray-900 text-white': type === 'secondary',
      'border-green-500 bg-green-500 text-white': type === 'success',
      'border-yellow-400 bg-yellow-400 text-white': type === 'warning',
      'border-red-500 bg-red-500 text-white': type === 'danger',
      'rounded-full': border == 'rounded',
      'bg-white': border == 'outline',
      'text-blue-500': (border == 'outline') && (type === 'primary'),
      'text-gray-900': (border == 'outline') && (type === 'secondary'),
      'text-green-500': (border == 'outline') && (type === 'success'),
      'text-yellow-400': (border == 'outline') && (type === 'warning'),
      'text-red-500': (border == 'outline') && (type === 'danger'),
    }
  );

  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

export const ButtonType = {
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger'
}

export const ButtonBorder = {
  Outline: 'outline',
  Rounded: 'rounded',
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  type: PropTypes.oneOf(Object.values(ButtonType)).isRequired,
  border: PropTypes.oneOf(Object.values(ButtonBorder)),
  loading: PropTypes.bool,
  rest: function(props: Object, propName: string, componentName: string) { },
};

export default Button;
