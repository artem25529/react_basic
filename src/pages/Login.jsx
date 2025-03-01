import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import validationService from '../services/validationService';
import '../styles/Login.css';
import performAPICallAsync from '../utils/getResouceAsync';

import { UserContext } from '../pages/PageWrapper.jsx';

function Login({ isLogin }) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const formRef = useRef();
  const loaderRef = useRef();
  console.log('render login');

  const title = isLogin ? 'Log in' : 'Sign up';

  const msg = isLogin
    ? "Don't have an account yet? Please, click "
    : 'Do you already have an account? Please, click ';

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  function handleValueChange(e) {
    const input = e.target;
    setValues((prev) => ({ ...prev, [input.name]: input.value }));
  }

  async function handleSubmit(e) {
    loaderRef.current.style.visibility = 'visible';
    e.preventDefault();
    await validationService.validateLoginForm(e.target, setErrors);

    loaderRef.current.style.visibility = 'hidden';

    if (formRef.current.checkValidity()) {
      localStorage.setItem('loggedInUser', values.email);
      setUser(values.email);
      navigate('/');
    }
  }

  return (
    <div className="login-page">
      <div ref={loaderRef} className="loader">
        Processing...
      </div>
      <div className="login-wrapper">
        <form
          ref={formRef}
          className="form"
          noValidate
          data-is-login={isLogin}
          onSubmit={handleSubmit}
        >
          <h3 className="header">{title}</h3>
          <div className="fields">
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                value={values.email}
                onChange={handleValueChange}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
              <div className="err">{errors.email}</div>
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                value={values.password}
                onChange={handleValueChange}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                minLength="4"
                maxLength="20"
              />
              <div className="err">{errors.password}</div>
            </div>
          </div>
          <div className="legend">
            {msg}
            <Link to={isLogin ? '/signup' : '/login'}>here</Link>
            {'!'}
          </div>
          <div className="submit">
            <button type="submit" className="submit">
              {title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
