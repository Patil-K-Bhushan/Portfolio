import { useState, useEffect } from 'react';

export default function useTypewriter(words, typeMs = 75, deleteMs = 40, pauseMs = 1800) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const word = words[wordIdx % words.length];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = pauseMs;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, typeMs, deleteMs, pauseMs]);

  return text;
}
