import { useEffect } from 'react';

export const usePassiveScroll = (elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const wheelOptions = { passive: true };
    const touchOptions = { passive: true };

    element.addEventListener('wheel', () => {}, wheelOptions);
    element.addEventListener('touchstart', () => {}, touchOptions);
    element.addEventListener('touchmove', () => {}, touchOptions);

    return () => {
      element.removeEventListener('wheel', () => {}, wheelOptions);
      element.removeEventListener('touchstart', () => {}, touchOptions);
      element.removeEventListener('touchmove', () => {}, touchOptions);
    };
  }, [elementRef]);
};
