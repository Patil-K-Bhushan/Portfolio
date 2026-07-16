import { useState, useCallback, useRef } from 'react';

export default function useToast() {
  const [toast, setToast] = useState({ show: false, msg: '' });
  const timer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 2600);
  }, []);

  return [toast, showToast];
}
