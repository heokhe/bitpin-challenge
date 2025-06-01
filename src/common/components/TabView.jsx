import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function TabView({ children, index, onChange }) {
  const carouselRootRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const carouselRoot = carouselRootRef.current;
    let timer;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      const newTab = Math.round(
        carouselRoot.scrollLeft / carouselRoot.clientWidth,
      );
      onChange(newTab);
      setIsScrolling(true);

      // Assuming the user stops scrolling after 100ms
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };
    carouselRoot.addEventListener('scroll', listener);
    return () => {
      carouselRoot.removeEventListener('scroll', listener);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [onChange]);

  useEffect(() => {
    const div = carouselRootRef.current;
    // We shouldn't just jump to the new tab if the user is currently scrolling
    if (div && !isScrolling) {
      div.scrollTo({ left: index * div.clientWidth });
    }
  }, [index, isScrolling]);

  return (
    <div
      className="flex *:w-full *:shrink-0 overflow-x-auto snap-x snap-mandatory *:snap-start snap-always scrollbar-hidden"
      ref={carouselRootRef}
    >
      {children}
    </div>
  );
}
