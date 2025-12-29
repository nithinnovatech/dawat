import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <ScrollToTop />
        <Cart />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<OrderSuccess />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
