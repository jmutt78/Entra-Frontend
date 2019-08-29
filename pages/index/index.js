import React from 'react'

import Areyou from './Areyou'
import Ask from './Ask'
import Clout from './Clout'
import Grid from './Grid'
import Hero from './Hero'
import Inspired from './Inspired'
import Questions from './Questions'
import Why from './Why'

import './index.css'

const Landingpage = () => {
  return (
    <div className="landingContainer">
      <Hero />
      <Why />
      <Questions />
      <Grid image="/static/inspired.jpg" head="Get Inspired" sub="Learn from fellow entrepreneurs.">
        <Inspired />
      </Grid>
      <Grid image="/static/ask.jpeg" head="Ask a Question" sub="Ask anything related to business.">
        <Ask />
      </Grid>
      <Grid
        image="/static/answers.jpg"
        head="Get Answers"
        sub="Crowdsource answers from other entrepreneurs and advisors."
      >
        <Answers />
      </Grid>
      <Grid
        image="/static/clout.jpg"
        head="Gain clout and notoriety"
        sub="Become an expert, help other Entras and grow your network."
      >
        <Clout />
      </Grid>
      <Areyou />
    </div>
  )
}

export default Landingpage
