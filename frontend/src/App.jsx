import React, { useState, useEffect, useCallback } from 'react';
import Loader from './components/common/Loader';
import AmbientBackground from './components/common/AmbientBackground';
import Navbar from './components/common/Navbar';
import MobileMenu from './components/common/MobileMenu';
import Hero from './components/portfolio/Hero';
import About from './components/portfolio/About';
import Skills from './components/portfolio/Skills';
import Projects from './components/portfolio/Projects';
import Achievements from './components/portfolio/Achievements';
import Timeline from './components/portfolio/Timeline';
import Contact from './components/portfolio/Contact';
import Footer from './components/portfolio/Footer';
import useTheme from './hooks/useTheme';
import usePortfolioData from './hooks/usePortfolioData';
import useScrollProgress from './hooks/useScrollProgress';
import useNavSpy from './hooks/useNavSpy';
import useSoundDelegation from './hooks/useSoundDelegation';
import useToast from './hooks/useToast';

export default function GamingPortfolio() {
  const [theme, toggleTheme] = useTheme();
  const [soundOn, setSoundOn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, showToast] = useToast();
  const { scrollPct, scrolled, showTop } = useScrollProgress();
  const [active] = useNavSpy(loaded);
  const play = useSoundDelegation(soundOn);
  const { data, loading } = usePortfolioData();

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
    play('click');
  }, [play]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  if (loading) return <Loader done={false} onDone={() => {}} />;

  return (
    <div className={`app bg-[var(--bg)] text-[var(--text)] min-h-screen overflow-x-hidden relative font-body transition-colors duration-500 theme-${theme} ${loaded ? 'loaded' : ''}`}>
      <Loader done={loaded} onDone={() => setLoaded(true)} />
      <AmbientBackground theme={theme} scrollPct={scrollPct} />
      <Navbar active={active} scrolled={scrolled} theme={theme} setTheme={toggleTheme} soundOn={soundOn} setSoundOn={setSoundOn} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <MobileMenu menuOpen={menuOpen} scrollTo={scrollTo} />
      <main className="relative z-10">
        <Hero data={data.profile} scrollTo={scrollTo} />
        <About data={data.profile} />
        <Skills data={data} />
        <Projects data={data} />
        <Achievements data={data} />
        <Timeline data={data} />
        <Contact showToast={showToast} />
      </main>
      <Footer showTop={showTop} scrollTo={scrollTo} />
      <div className={`fixed bottom-6 left-6 z-[1500] font-mono text-[0.68rem] tracking-wider py-3 px-6 bg-slate-900 border border-neon-cyan/25 text-neon-cyan [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))] transition-all duration-500 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>{toast.msg}</div>
    </div>
  );
}
