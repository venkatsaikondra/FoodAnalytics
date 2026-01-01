import React, { useState, useMemo } from 'react';
import Pay from '../components/Pay';

const sampleFoods = [
  { id: 1, name: 'Margherita Pizza', price: 12.0, image: 'https://source.unsplash.com/collection/1163637/400x300?sig=1' },
  { id: 2, name: 'California Roll', price: 7.5, image: 'https://source.unsplash.com/collection/1163637/400x300?sig=2' },
  { id: 3, name: 'Chicken Wings', price: 8.5, image: 'https://source.unsplash.com/collection/1163637/400x300?sig=3' },
  { id: 4, name: 'Caesar Salad', price: 7.0, image: 'https://source.unsplash.com/collection/1163637/400x300?sig=4' },
];

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === food.id);
      if (existing) {
        return prev.map((p) => (p.id === food.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const changeQty = (id, qty) => {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)));
  };

  const subtotal = useMemo(() => cart.reduce((acc, it) => acc + it.price * it.quantity, 0), [cart]);
  const tax = useMemo(() => +(subtotal * 0.075).toFixed(2), [subtotal]);
  const delivery = subtotal > 30 || subtotal === 0 ? 0 : 2.5;

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}>
      <section>
        <h2 style={{ marginTop: 0 }}>Find Your Favorite Food</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          {sampleFoods.map((food) => (
            <div key={food.id} style={{ display: 'flex', gap: 12, background: '#fff', padding: 12, borderRadius: 8, alignItems: 'center' }}>
              <img src={food.image} alt={food.name} style={{ width: 110, height: 70, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 6px' }}>{food.name}</h3>
                <div style={{ color: '#666', fontSize: 13 }}>Starting at ${food.price.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => addToCart(food)} style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#0f9d58', color: '#fff', cursor: 'pointer' }}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside>
        <div style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Your Cart</h3>
          {cart.length === 0 ? (
            <div style={{ color: '#666' }}>Your cart is empty</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cart.map((it) => (
                <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <img src={it.image} alt={it.name} style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{it.name}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>${it.price.toFixed(2)} × {it.quantity}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button onClick={() => changeQty(it.id, it.quantity - 1)} style={{ width: 28 }}>-</button>
                    <div style={{ minWidth: 22, textAlign: 'center' }}>{it.quantity}</div>
                    <button onClick={() => changeQty(it.id, it.quantity + 1)} style={{ width: 28 }}>+</button>
                    <button onClick={() => removeFromCart(it.id)} style={{ marginLeft: 8, color: '#d64545', background: 'transparent', border: 'none' }}>✕</button>
                  </div>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #eee', paddingTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>Subtotal:</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>Tax:</div>
                  <div>${tax.toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>Delivery Fee:</div>
                  <div>${delivery.toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontWeight: 700, fontSize: 18 }}>
                  <div>Total:</div>
                  <div>${(subtotal + tax + delivery).toFixed(2)}</div>
                </div>
              </div>

            </div>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <Pay cart={cart} />
        </div>
      </aside>
    </div>
  );
}
