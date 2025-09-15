import React from 'react'; 

// IMPORT CSS FILES WITHOUT ASSIGNING A VARIABLE NAME (unless using CSS Modules)
import './components/Header.css';
import './components/Hero.css';
import './components/Products.css'; // Corrected: Removed 'Products from'
import './components/Footer.css';   // Corrected: Removed 'Footer from'

// IMPORT YOUR REACT COMPONENTS
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Products from './components/Products.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Footer />
    </>
  );
}

export default App;
