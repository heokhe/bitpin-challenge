import { twMerge } from 'tailwind-merge';

export default function Input({ className, ...props }) {
  return (
    <input
      className={twMerge(
        'bg-text/5 focus:ring focus-visible:ring-primary !outline-0 focus:bg-primary/5 focus:text-title caret-primary duration-100 w-full rounded-lg px-3 py-2 in-[label]:mt-1.5 text-base',
        className,
      )}
      {...props}
    />
  );
}
