import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { Button } from '@mui/material';

import DeliveryContext from '../context/DeliveryContext';
import { loginUser } from '../helpers/api';

import '../styles/LoginForm.css';

const LENGTH_PASSWORD = 6;
const REGEX_EMAIL = /^[a-z0-9-_\]@[a-z0-9]+\.[a-z]?/i;

export default function LoginForm() {
  const navigate = useNavigate();
  const [erroResponse, setErroResponse] = useState('');
  const { setDataLogin, dataLogin } = useContext(DeliveryContext);

  const redirectRoute = (role) => {
    if (role === 'seller') navigate('/seller/orders');
    if (role === 'customer') navigate('/customer/products');
    if (role === 'administrator') navigate('/admin/manage');
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(dataLogin);

    if (response.message) {
      setErroResponse(response.message);
    } else {
      const { role } = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
      redirectRoute(role);
    }
  };

  return (
    <div className="container-login-error">
      <form className="container-form">
        <label htmlFor="email-input" className="label-login">
          Login
          <input
            className="input-login"
            placeholder="email@seuemail.com"
            type="email"
            name="email"
            id="email-input"
            data-testid="common_login__input-email"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password-input" className="label-login">
          Senha
          <input
            className="input-login"
            placeholder="*********"
            type="password"
            name="password"
            id="password-input"
            data-testid="common_login__input-password"
            onChange={ handleChange }
          />
        </label>
        {/* <Button variant="text">Text</Button> */}
        <button
          className="login-button"
          type="button"
          data-testid="common_login__button-login"
          disabled={
            (!REGEX_EMAIL.test(dataLogin.email)
            || dataLogin.password.length < LENGTH_PASSWORD)
          }
          onClick={ handleLogin }
        >
          LOGIN
        </button>

        <button
          className="account-button"
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      <p
        className="error-message"
        data-testid="common_login__element-invalid-email"
      >
        { erroResponse }
      </p>
    </div>
  );
}
