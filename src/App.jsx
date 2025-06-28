import { useState } from 'react'
import './App.css'
import Header from './components/Header.css'
import Receipt from './components/Receipt.css'
import SpendMoney from './components/SpendMoney.css'
import Footer from './components/Footer.css'
import Header from './components/Header.js'
import Receipt from './components/Receipt.js'
import SpendMoney from './components/SpendMoney.js'
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
