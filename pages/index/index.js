import React from 'react'
import Questions from './Questions'
import Hero from './Hero'
import Why from './Why'

import './index.css'

const Landingpage = () => {
  return (
    <div className="landingContainer">
      <Hero />
      <Why />
      <Questions />
    </div>
  )
}

export default Landingpage
