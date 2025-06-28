import { useState } from 'react'
import './App.css'
import Header from './components/Header.css'
import Receipt from './components/Receipt.css'
import Products from './components/Products.css'
import Footer from './components/Footer.css'
import Header from './components/Header.js'
import Receipt from './components/Receipt.js'
import Products from './components/Products.js'
import Footer from './components/Footer.js'

function App() {


  return (
    <>
      <Header />
      <Receipt />
      <Products />
      <Footer />
    </>
  )
}

export default App
