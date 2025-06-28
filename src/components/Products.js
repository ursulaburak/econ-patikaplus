import React, { useState, useEffect } from 'react';
import './components/Products.css';
import { products } from '../../data';

const Products = () => {
  const [budget, setBudget] = useState(100000000000);
  const [displayBudget, setDisplayBudget] = useState(100000000000);
  const [quantities, setQuantities] = useState({});
  const [receipts, setReceipts] = useState([]);

  // ANIMATION: COUNT
  useEffect(() => {
    const duration = 200;
    const steps = 10; 
    const stepDuration = duration / steps;

    const startValue = displayBudget;
    const endValue = budget;
    const increment = (endValue - startValue) / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayBudget(Math.round(startValue + (increment * currentStep)));
      } else {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [budget]);

  const handleBuy = (productId, price) => {
    setBudget(prevBudget => prevBudget - price);
    setQuantities(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  
    const product = products.find(p => p.id === productId);
    setReceipts(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        // ADD PRODUCT
        return prev.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // ADD PRODUCT FOR THE FIRST TIME: ADD RECEIPT
        return [...prev, { name: product.name, quantity: 1, price }];
      }
    });
  };

  const handleSell = (productId, price) => {
    const currentQuantity = quantities[productId] || 0;
    if (currentQuantity > 0) {
      setBudget(prevBudget => prevBudget + price);
      setQuantities(prev => ({ ...prev, [productId]: currentQuantity - 1 }));
    }
  };

  const handleQuantityChange = (productId, value, price) => {
    const newQuantity = parseInt(value) || 0;
    const currentQuantity = quantities[productId] || 0;

    if (newQuantity >= 0) {
      const difference = newQuantity - currentQuantity;

      if (difference > 0) {
        // PURCHASE
        setBudget(prevBudget => prevBudget - (price * difference));
      } else if (difference < 0) {
        // SELL
        setBudget(prevBudget => prevBudget + (price * Math.abs(difference)));
      }

      setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    }
  };

  // RECEIPT: TOTAL
  const totalAmount = receipts.reduce((total, receipt) => total + (receipt.price * receipt.quantity), 0);

  return (
    <div>
      <div className='section budget-bar'>
        <div>
          <span>${displayBudget.toLocaleString()}</span>
        </div>
      </div>

      <div className='product-box'>
        {products.map((product) => (
      <div key={product.id} className="product-item">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className='box-btns'>
        <button
          onClick={() => handleSell(product.id, product.price)}
          disabled={!(quantities[product.id] > 0)}
          className={!(quantities[product.id] > 0) ? 'disabled' : 'sell-button'}>
          Sell
        </button>
        <input
          type="number"
          value={quantities[product.id] || 0}
          onChange={(e) => handleQuantityChange(product.id, e.target.value, product.price)}
          min="0"/>
        <button
          onClick={() => handleBuy(product.id, product.price)}
          disabled={budget < product.price}
          className={budget < product.price ? 'disabled' : 'buy-button'}>
          Buy
        </button>
      </div>
    </div>
  ))}
  </div>
      {/* RECEIPT */}
      <div className='receipt'>
      <h2>Your Receipt</h2>
      {Object.entries(quantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([productId, quantity]) => {
          const product = products.find(p => p.id === parseInt(productId));
          return (
            <div key={productId}>
              <p>{product.name} - {quantity}x - <span className='price-receipt'>${product.price * quantity}</span></p>
            </div>
          );
        })}
      <hr />
      <h3 >
        TOTAL: <span className='price-receipt'>$
        {Object.entries(quantities)
          .reduce((total, [productId, quantity]) => {
            const product = products.find(p => p.id === parseInt(productId));
            return total + (product.price * quantity);
          }, 0)
          .toLocaleString()}</span>
      </h3>
    </div>
    </div>
  );
};

export default Products;
