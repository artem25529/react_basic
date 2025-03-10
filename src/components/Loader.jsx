import Spinner1 from './Spinner1.jsx';
import Spinner2 from './Spinner2.jsx';
import '../styles/Loader.css';

function Loader({ text, spinner, background, contentStyle }) {
  if (!text && !spinner) {
    return null;
  }

  return (
    <div className="loader">
      {background === true ? (
        <div className="loader-back">
          <div className="loader-content" style={contentStyle}>
            {text && <div className="loader-text">{text}</div>}
            {spinner === 1 && <Spinner1 />}
            {spinner === 2 && (
              <Spinner2
                style={text ? { transform: 'translateY(0.15em)' } : null}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="loader-content" style={contentStyle}>
          {text && <div className="loader-text">{text}</div>}
          {spinner === 1 && <Spinner1 />}
          {spinner === 2 && (
            <Spinner2
              style={text ? { transform: 'translateY(0.15em)' } : null}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Loader;
