import React from 'react';
import useInView from '../hooks/useInView';

export default function withScrollReveal(WrappedComponent, delay = 0, threshold = 0.14) {
  return function ScrollRevealWrapper(props) {
    const [ref, inView] = useInView(threshold);

    return (
      <div
        ref={ref}
        className={`reveal ${inView ? 'visible' : ''}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
}
