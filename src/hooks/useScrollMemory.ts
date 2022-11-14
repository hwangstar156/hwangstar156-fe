import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';

const useScrollMemory = () => {
  const router = useRouter();
  const [scrollTop, setScrollTop] = useState(0);

  const handleRouteChangeStart = () => {
    const currentScrollTop = document.documentElement.scrollTop;
    sessionStorage.setItem('scroll-memory', String(currentScrollTop));
  };

  const handleRouteChangeComplete = () => {
    setScrollTop(Number(sessionStorage.getItem('scroll-memory')));
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    setScrollTop(Number(sessionStorage.getItem('scroll-memory')));

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = Number(scrollTop);
  }, [scrollTop]);
};

export default useScrollMemory;
