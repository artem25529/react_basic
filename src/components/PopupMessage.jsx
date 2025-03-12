import { useEffect, useRef } from 'react';
import '../styles/PopupMessage.css';

function PopupMessage({
  message,
  level,
  resetCallback,
  callback,
  milliseconds,
}) {
  const timeout = useRef();

  useEffect(() => {
    timeout.current = setTimeout(
      () => {
        closeFunc();
      },
      milliseconds ? milliseconds : 5000,
    );
  }, []);

  function handleClose() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    closeFunc();
  }

  function closeFunc() {
    resetCallback();

    if (typeof callback === 'function') {
      callback();
    }
  }

  return (
    <div className={'popup-message' + (level ? ` ${level}` : '')}>
      <div className="popup-content">{message}</div>
      <div className="popup-close" onClick={handleClose}>
        &times;
      </div>
    </div>
  );
}

export default PopupMessage;
