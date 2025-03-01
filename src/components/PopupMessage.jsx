import { useEffect, useState, useRef } from 'react';
import '../styles/PopupMessage.css';

function PopupMessage({ message, level }) {
  const [isVisible, setIsVisible] = useState(true);

  const timeout = useRef();

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  function handleClose() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setIsVisible(false);
  }
  return (
    <div
      className={'popup-message' + (level ? ` ${level}` : '')}
      style={!isVisible ? { display: 'none' } : null}
    >
      <div className="popup-content">{message}</div>
      <div className="popup-close" onClick={handleClose}>
        &times;
      </div>
    </div>
  );
}

export default PopupMessage;
