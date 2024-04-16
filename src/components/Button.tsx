import { ReactNode } from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';
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
  const { children, type, border='rounded', loading, ...rest } = props;

  const classes = className(
    rest.className,
    'flex items-center py-6 px-6 border h-8',
    {
      'opacity-80': loading,
      'border border-2 border-primary bg-primary text-black font-bold': type === 'primary',
      'border border-2 border-accent bg-accent text-black font-semibold': type === 'secondary',
      'border-green-500 bg-green-500 text-white': type === 'success',
      'border-yellow-400 bg-yellow-400 text-white': type === 'warning',
      'border-red-500 bg-red-500 text-white': type === 'danger',
      'rounded': border === 'rounded',
      'bg-white': border === 'outline',
      'text-blue-500': (border === 'outline') && (type === 'primary'),
      'text-gray-900': (border === 'outline') && (type === 'secondary'),
      'text-green-500': (border === 'outline') && (type === 'success'),
      'text-yellow-400': (border === 'outline') && (type === 'warning'),
      'text-red-500': (border === 'outline') && (type === 'danger'),
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
