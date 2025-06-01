import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(
  'font-medium cursor-pointer rounded-md duration-100 active:scale-90 py-2 px-4 inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        text: 'text-text hover:bg-text/5',
        soft: 'bg-primary/5 hover:bg-primary/10 text-primary',
        solid: 'bg-primary text-primary-foreground',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
  },
);

export default function Button({
  variant = 'solid',
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={twMerge(buttonStyles({ variant, disabled }), className)}
      disabled={disabled}
      {...props}
    />
  );
}
