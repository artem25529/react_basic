import React from 'react';

function Login() {
  return (
    <div className="login">
      <div className="container">
        <h3 className="header">Sign in</h3>
        <form className="form">
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="label">
            Do you already have an accounbt? Please, click here!
          </div>
          <div className="submit">
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
