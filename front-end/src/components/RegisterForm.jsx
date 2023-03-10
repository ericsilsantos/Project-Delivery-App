import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import { registerUser } from '../helpers/api';

export default function RegisterForm() {
  const [erroResponse, setErroResponse] = useState('');
  const { dataRegister, setDataRegister } = useContext(DeliveryContext);

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataRegister({ ...dataRegister, [name]: value });
  };

  const regex = /\S+@\S+\.\S+/;
  const numberTwelve = 12;
  const numberSix = 6;
  const checkName = () => dataRegister.name.length >= numberTwelve;
  const checkPassword = () => dataRegister.password.length >= numberSix;
  const checkEmail = () => regex.test(dataRegister.email);

  const register = async () => {
    const response = await registerUser(dataRegister);
    if (response.message) {
      setErroResponse(response.message);
    } else {
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/customer/products');
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <div>
        <form>
          <label htmlFor="name-input">
            Nome
            <input
              placeholder="Seu nome"
              type="name"
              name="name"
              id="name-input"
              data-testid="common_register__input-name"
              onChange={ handleChange }
            />
          </label>

          <label htmlFor="email-input">
            Email
            <input
              placeholder="seu-email@site.com.br"
              type="email"
              name="email"
              id="email-input"
              data-testid="common_register__input-email"
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
              data-testid="common_register__input-password"
              onChange={ handleChange }
            />
          </label>

          <button
            type="button"
            data-testid="common_register__button-register"
            disabled={ !(checkEmail() && checkName() && checkPassword()) }
            onClick={ register }
          >
            Cadastrar
          </button>
        </form>
      </div>
      {
        erroResponse
        && (
          <p
            data-testid="common_register__element-invalid_register"
          >
            { erroResponse }
          </p>
        )
      }
    </div>
  );
}
