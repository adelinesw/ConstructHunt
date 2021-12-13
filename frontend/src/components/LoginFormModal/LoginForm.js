import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions?.login({ credential, password })).catch(
      async (res) => {
        const data = await res?.json();
        if (data && data?.errors) setErrors(data?.errors);
      }
    );
    history.push('/');
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="loginBtn" type="submit">Log In</button>
      <button className="demoBtn" onClick={() => {setCredential('Demo-lition'); setPassword('password');}}>Demo</button>
    </form>
  );
}

export default LoginForm;
