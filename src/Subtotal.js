import React from 'react';
import './css/Subtotal.css';
import CurrecyFormat  from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketAmount } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();
    const navigate = useNavigate();
  return (
    <div className='subtotal'>
        <CurrecyFormat
            renderText={(value) => (
                <>
                    <p>
                        Subtotal ({basket?.length} items): <strong>{value}</strong>
                    </p>
                    <small className='subtotal__gift'>
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
            )}
            decimalScale={2}
            value={getBasketAmount(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />
        <button className='subtotal_checkout' onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
