import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../components/common/Navbar';

export default function useNavSpy(loaded) {
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [loaded]);

  return [active, setActive];
}
