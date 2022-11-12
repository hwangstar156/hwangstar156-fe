import { useEffect, useRef } from 'react';

const useLazyLoadingObserver = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            observer.unobserve(target);
            if (target.dataset.src) {
              target.src = target.dataset.src;
            }
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    imageRef.current && observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  });

  return { imageRef };
};

export default useLazyLoadingObserver;
