import { useEffect } from 'react';
import useSound from './useSound';

export default function useSoundDelegation(soundOn) {
  const play = useSound(soundOn);

  useEffect(() => {
    if (!soundOn) return;
    const onOver = (e) => {
      if (e.target.closest('a, button, .skill-card, .project-card, .ach-card, .chip')) {
        play('hover');
      }
    };
    const onDown = (e) => {
      if (e.target.closest('a, button')) play('click');
    };
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
    };
  }, [soundOn, play]);

  return play;
}
