import { useEffect, useState } from 'react';

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 2560,
} as const;

const getMatches = (query: string): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }
  return false;
};

/** Без задержки показывает мэтч с mediaQuery */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query));
    }

    const matchMedia = window.matchMedia(query);

    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
};

export const useBreakpointDown = (key: keyof typeof BREAKPOINTS) => {
  return useMediaQuery(`(max-width: ${BREAKPOINTS[key] - 1}px)`);
};

export const useBreakpointUp = (key: keyof typeof BREAKPOINTS) => {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[key]}px)`);
};
