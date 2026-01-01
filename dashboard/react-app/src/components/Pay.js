import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Laptop, Loader2, ShoppingCart } from 'lucide-react';

const Pay = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const { isLoading, isError, mutate, data } = useMutation({
    mutationFn: async (cartToSend) => {
      const startTime = Date.now();
      const response = await axios.post('http://localhost:8000/payment-service', { cart: cartToSend });
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      return { ...response.data, duration };
    },
  });

  return (
    <div style={{ background: '#fff6f6', padding: 20, borderRadius: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h4 style={{ margin: 0, fontWeight: 300, letterSpacing: 1 }}>CART TOTAL</h4>
            <h3 style={{ margin: 0, fontWeight: 700 }}>${total}</h3>
          </div>
          <p style={{ margin: '8px 0 0', color: '#666', fontSize: 13 }}>Shipping & taxes calculated at checkout</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 13 }}>
          <input type="checkbox" id="terms" defaultChecked />
          <label htmlFor="terms">I agree to the <span style={{ color: '#e06d6d' }}>Terms and Conditions</span></label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666' }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>Saved Card:</span>
          <img src="/visa.png" alt="card" width={30} height={20} style={{ objectFit: 'contain' }} onError={(e)=>e.currentTarget.style.display='none'} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>**** 3567</span>
          <span style={{ fontSize: 12, color: '#e06d6d' }}>(change)</span>
        </div>

        <button
          disabled={isLoading}
          onClick={() => mutate(cart)}
          style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 999, display: 'inline-flex', gap: 8, alignItems: 'center', cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          <span style={{ letterSpacing: 1 }}>CHECKOUT</span>
          {isLoading ? <Loader2 size={16} className="spin" /> : <ShoppingCart size={16} />}
        </button>

        {data && (
          <div style={{ color: '#2a9d4a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Laptop size={18} />
            <span>Successful in <strong style={{ color: data?.duration > 5 ? '#d64545' : '#2a9d4a' }}>{data?.duration}</strong> seconds</span>
          </div>
        )}

        {isError && <div style={{ color: '#d64545' }}>Something went wrong!</div>}
      </div>
    </div>
  );
};

export default Pay;
