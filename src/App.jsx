import React from 'react'; 

// IMPORT CSS FILES WITHOUT ASSIGNING A VARIABLE NAME (unless using CSS Modules)
import './components/Header.css';
import './components/Receipt.css';
import './components/Products.css'; // Corrected: Removed 'Products from'
import './components/Footer.css';   // Corrected: Removed 'Footer from'

// IMPORT YOUR REACT COMPONENTS
import Header from './components/Header.js';
import Receipt from './components/Receipt.js';
import Products from './components/Products.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <>
      <Header />
      <Receipt />
      <Products />
      <Footer />
    </>
  );
}

export default App;
