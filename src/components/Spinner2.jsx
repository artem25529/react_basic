import { useEffect, useRef } from 'react';
import '../styles/Spinner2.css';

function Spinner2() {
  const spinnerRef = useRef();

  useEffect(() => {
    const dots = spinnerRef.current.children;

    for (let i = 1; i < dots.length; i++) {
      dots[i].style.animationDelay = `${i * 70}ms`;
    }
  }, []);

  return (
    <div className="spinner-2" ref={spinnerRef}>
      <div className="spinner-dot"></div>
      <div className="spinner-dot"></div>
      <div className="spinner-dot"></div>
    </div>
  );
}

export default Spinner2;
