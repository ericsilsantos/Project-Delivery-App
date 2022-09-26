import React, { useContext, useState, useEffect } from 'react';
import DeliveryContext from '../context/DeliveryContext';

export default function Card() {
  const REPLACE = '.';
  const { products } = useContext(DeliveryContext);
  const [quantity, setQuantity] = useState({});
  const [valueTotal, setValueTotal] = useState(0);

  const sumTotal = async (price) => {
    const priceProd = parseFloat(price);
    const calcTotal = valueTotal + priceProd;
    setValueTotal(calcTotal);
  };

  const subTotal = (price) => {
    const priceProd = parseFloat(price);
    const calcTotal = valueTotal - priceProd;
    setValueTotal(calcTotal);
  };

  // em andamento
  const calcInput = async (qty, name, price) => {
    setQuantity({ ...quantity, [name]: qty });

    const calcProd = qty * price;
    const calcTotal = valueTotal + calcProd;

    setValueTotal(calcTotal);
  };

  const inputQuantity = ({ target }) => {
    const { value, name, id: price } = target;
    const qtyNumber = parseFloat(value);
    const priceNumber = parseFloat(price);
    setQuantity({ ...quantity, [name]: qtyNumber });
    calcInput(qtyNumber, name, priceNumber);
  };

  const incrementeQuantity = ({ target }) => {
    const { name, value } = target;
    const sum = typeof quantity[name] !== 'number' ? 0 : quantity[name];

    setQuantity({ ...quantity, [name]: sum + 1 });
    sumTotal(value);
  };

  const decrementeQuantity = ({ target }) => {
    const { name, value } = target;
    if (quantity[name] === 0 || quantity[name] === undefined) {
      setQuantity({ ...quantity, [name]: 0 });
    } else {
      setQuantity({ ...quantity, [name]: quantity[name] - 1 });
      subTotal(value);
    }
  };

  // em andamento
  const saveStorage = () => {

  };

  // em andamento
  useEffect(() => {
    saveStorage();
  }, [quantity]);

  return (
    <>
      <main style={ { display: 'flex' } }>
        {products
          && products.map((prod, index) => (
            <div
              key={ prod.id }
              style={ { border: '2px solid white' } }
            >
              <div>
                <img
                  src={ prod.urlImage }
                  alt={ prod.name }
                  data-testid={ `customer_products__img-card-bg-image-${prod.id}` }
                  width="100px"
                  height="100px"
                />
              </div>
              <p data-testid={ `customer_products__element-card-title-${prod.id}` }>
                {prod.name}
              </p>
              <p data-testid={ `customer_products__element-card-price-${prod.id}` }>
                {prod.price.replace(REPLACE, ',')}
              </p>
              <label htmlFor={ `quantity-${prod.id}` }>
                <button
                  data-testid={ `customer_products__button-card-rm-item-${prod.id}` }
                  type="button"
                  name={ prod.name }
                  id={ `quantity-${prod.id}` }
                  value={ prod.price }
                  onClick={ (e) => decrementeQuantity(e) }
                >
                  -
                </button>
                <input
                  value={ quantity[prod.name] || 0 }
                  name={ prod.name }
                  min="0"
                  onChange={ (e) => inputQuantity(e) }
                  id={ prod.price }
                  type="number"
                  data-testid={ `customer_products__input-card-quantity-${prod.id}` }
                />
                <button
                  data-testid={ `customer_products__button-card-add-item-${prod.id}` }
                  type="button"
                  name={ prod.name }
                  id={ index }
                  value={ prod.price }
                  onClick={ (e) => incrementeQuantity(e) }
                >
                  +
                </button>
              </label>
            </div>
          ))}
      </main>
      <button
        data-testid="customer_products__checkout-bottom-value"
        type="button"
        name="total-price"
        id="total-price"
      >
        {valueTotal.toFixed(2).replace(REPLACE, ',')}
      </button>
    </>
  );
}
