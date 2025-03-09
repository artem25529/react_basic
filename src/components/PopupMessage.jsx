import { useEffect, useState, useRef, forwardRef } from 'react';
import '../styles/PopupMessage.css';

function PopupMessage({ message, level, callback }, ref) {
  const [isVisible, setIsVisible] = useState(true);
  const timeout = useRef();

  useEffect(() => {
    timeout.current = setTimeout(() => {
      closeFunc();
    }, 5000);
  }, []);

  function handleClose() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    closeFunc();
  }

  function closeFunc() {
    setIsVisible(false);

    if (typeof callback === 'function') {
      callback();
    }
  }

  return (
    <>
      {isVisible && (
        <div ref={ref} className={'popup-message' + (level ? ` ${level}` : '')}>
          <div className="popup-content">{message}</div>
          <div className="popup-close" onClick={handleClose}>
            &times;
          </div>
        </div>
      )}
    </>
  );
}

export default forwardRef(PopupMessage);
