import React, { useRef, useEffect, useState } from 'react';

export default function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        ob.disconnect();
      }
    }, { threshold: 0.12 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[34px]'} ${className}`}
    >
      {children}
    </div>
  );
}
