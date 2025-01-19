import { useEffect } from 'react';

type EventHandler = (e: Event) => void;

export const usePassiveScroll = (elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleEvent: EventHandler = (e) => {
      e.preventDefault();
    };

    const options: AddEventListenerOptions = { passive: false };

    element.addEventListener('wheel', handleEvent, options);
    element.addEventListener('touchstart', handleEvent, options);
    element.addEventListener('touchmove', handleEvent, options);

    return () => {
      element.removeEventListener('wheel', handleEvent, options);
      element.removeEventListener('touchstart', handleEvent, options);
      element.removeEventListener('touchmove', handleEvent, options);
    };
  }, [elementRef]);
};
