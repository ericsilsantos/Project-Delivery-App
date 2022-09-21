import React, { useContext, useState } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import { loginUser } from '../helpers/api';

export default function LoginForm() {
  const [erroResponse, setErroResponse] = useState('');
  const { setDataLogin, dataLogin } = useContext(DeliveryContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(dataLogin);

    if (response.message) setErroResponse(response.message);
    localStorage.setItem('login', JSON.stringify(response));
  };

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          Login
          <input
            placeholder="email@seuemail.com"
            type="email"
            name="email"
            id="email-input"
            data-testid="common_login__input-email"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password-input">
          Senha
          <input
            placeholder="*********"
            type="password"
            name="password"
            id="password-input"
            data-testid="common_login__input-password"
            onChange={ handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="common_login__button-login"
          onClick={ handleLogin }
        >
          LOGIN
        </button>

        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>

        {
          erroResponse
          && <p>{ erroResponse }</p>
        }
      </form>
    </div>
  );
}
