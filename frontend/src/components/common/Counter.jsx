import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { val: 0 };
    this.ref = React.createRef();
    this.raf = null;
  }

  componentDidMount() {
    this.observeRef();
  }

  componentWillUnmount() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.observer) this.observer.disconnect();
  }

  observeRef() {
    this.observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        this.animateCount();
        this.observer.disconnect();
      }
    }, { threshold: 0.6 });
    if (this.ref.current) this.observer.observe(this.ref.current);
  }

  animateCount() {
    const start = performance.now();
    const duration = this.props.duration || 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      this.setState({ val: Math.round(eased * this.props.target) });
      if (p < 1) this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  render() {
    return (
      <span ref={this.ref} className="font-display font-black text-[2.35rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple animate-pulse-glow">
        {this.state.val}{this.props.suffix || '+'}
      </span>
    );
  }
}
