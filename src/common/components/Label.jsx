import { twMerge } from 'tailwind-merge';

export default function Label({ className, ...props }) {
  return (
    <label
      className={twMerge('text-sm tracking-wider block mb-1.5', className)}
      {...props}
    />
  );
}
