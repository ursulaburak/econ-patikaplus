import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
            <div className='footer'>
                <p>Get new posts!</p>
                <div className='input-area'>
                  <input className='newsletter-input' type="text" placeholder='Your email'/>
                  <button className='newsletter-subscribe'>
                    Subscribe
                  </button>
                </div>
                <div className='footer-logo'>
                    <img src="./logo.svg" alt="logo" />
                </div>
            </div>
      </footer>
  )
}

export default Footer
