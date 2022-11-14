import { useCallback, useEffect, useRef, useState } from 'react';

interface UseObserverProps {
  hasNext: boolean;
  callback: () => void;
}

const useObserver = ({ hasNext, callback }: UseObserverProps) => {
  const [elementRef, setElementRef] = useState<null | HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (elementRef === null) {
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && callback());
    });

    if (hasNext) {
      observerRef.current.observe(elementRef);
      return;
    }
    observerRef.current.unobserve(elementRef);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [elementRef, hasNext, callback]);

  const handleElementRef = useCallback((node: HTMLDivElement) => {
    setElementRef(node);
  }, []);

  return { handleElementRef };
};

export default useObserver;
