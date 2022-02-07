import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { login, signup } from '../../store/session';
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import ProductModal from '../ProductModal'
import { Modal } from '../../context/Modal';

function SignupForm({setShowModal, showModal, product}) {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState('');
  let [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  let [credential, setCredential] = useState("");

  useEffect(() => {
    (async() => {
      setLoaded(true);
    })();
  }, [dispatch]);

  const validator = () => {
    let error = []
    if(first_name.length > 41) {
        error.push('. : Please enter a shorter first name than 40 characters.')
    } else if(first_name.length < 4) {
      error.push('. : Please enter a first name longer than 3 characters.')
    }
    if(last_name.length > 41) {
      error.push('. : Please enter a shorter last name than 40 characters.')
    } else if(last_name.length < 4) {
      error.push('. : Please enter a last name longer than 3 characters.')
    }
    if(password !== confirmPassword) {
      error.push('. : Please enter matching passwords.')
    }
    if(email.length > 256) {
        error.push('. : Please enter a shorter email than 255 characters.')
    }
    if(password.length > 256) {
      error.push('. : Please enter a shorter password than 255 characters.')
    }
    else if (password.length < 6) {
    error.push('. : Please enter a password longer than 5 characters.')
    }
    return error;
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    const errorsArr = validator()
    if(errorsArr.length) {
      setErrors(errorsArr)
    } else{
      const payload = {
          first_name,
          last_name,
          email,
          password
      }
    if (password === confirmPassword) {
      const data = await dispatch(signup(payload));
      if(data) {
        setErrors(data)
        }
      }
    }
  };

  const demoLogin = async(e) => {
    const newest = document.getElementsByTagName("body")[0];
    newest.classList.add("no-scroll");

    const newest2 = document.getElementsByClassName("product-container")[0];
    newest2.classList.add("hide");

    setErrors([]);
    credential = 'Demo';
    password = 'password';
    await dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    setShowModal(true)
    closeMenu(e)
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/`}/>;
  }


  const handleCancel = (e) => {
    e.preventDefault();
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('no-scroll')

    const newest2 = document.getElementsByClassName("product-container")[0];
    newest2.classList.remove("hide");

    // const newest3 = document.getElementById("modal-background")[0];
    // newest3.classList.remove("hide");
    setShowModal(false);
    }

  const closeMenu = (e) => {
    e.preventDefault()
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('no-scroll')

    const newest2 = document.getElementsByClassName("product-container")[0];
    newest2.classList.remove("hide");

    // const newest3 = document.getElementById("modal-background")[0];
    // newest3.classList.remove("hide");
    setShowModal(false);
    };

  return (<div>{loaded && (
    // <div className="blackBack">
    <div className="signup-page">
      <div className="login-form-container">
      <div className="logoThing"><img className="loginLogo" src="https://user-images.githubusercontent.com/86431563/151272960-32862845-4cd0-4618-89c8-cbd657c31d15.png"/></div>
      <div className="loginText2">Sign up on Construct Hunt</div>
      <div className="textStuff">Join our community of friendly folks discovering and sharing the latest products in architecture and city planning.</div>
        <button onClick={demoLogin} className="demoBtn3">Sign in with Demo</button>
        {showModal && (
          <Modal onClose={closeMenu}>
          <>
            <ProductModal setShowModal2={setShowModal} product={product}/>
            <button className="circleClose" onClick={handleCancel}>x</button>
            </>
          </Modal>
        )}
        <form onSubmit={onSignUp} className="login-form">
          <div className="errors">
            {errors.map((error, idx) => (
            <div key={idx}>{error.split(':')[1]}</div>
            ))}
          </div>
          <div>
            <input
              type='text'
              className="email-input2"
              placeholder="first name"
              name='first_name'
              value={first_name}
              onChange={updateFirstName}
              required
            />
          </div>
          <div>
            <input
              type='text'
              className="email-input2"
              placeholder="last name"
              name='last_name'
              value={last_name}
              onChange={updateLastName}
              required
            />
          </div>
          <div>
            <input
              type='text'
              className="email-input2"
              placeholder="email"
              name='email'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
          <div>
            <input
              type='password'
              className='email-input2'
              placeholder="password"
              name='password'
              value={password}
              onChange={updatePassword}
              required
            />
          </div>
          <div>
            <input
              type='password'
              className='email-input2'
              placeholder="repeat password"
              name='repeat_password'
              value={repeatPassword}
              onChange={updateRepeatPassword}
              required
            /><div>
            <button type='submit' className="signup-button">Sign up</button>
            </div>
          </div>
        </form>
      </div>
    </div>)}
  </div>
  );
}

export default SignupForm;
