import React from 'react'
import './About.css'
import githubLogo from '../../images/github.png'
import htmlLogo from '../../images/html.jpg'
import cssLogo from '../../images/css.png'
import jsLogo from '../../images/html.jpg'
import likedinLogo from '../../images/linkedin.jpg'
import reactLogo from '../../images/react.png'
import sqlLogo from '../../images/sql.png'

const About = () => {
  return (
    
      <div className='about-Container'>
      <h2 className='about-text'>Soy Matías Camba</h2>
      <p className='about-text'>Realicé este proyecto utilizando principalmente estas tecnologías:</p>
      <hr />
      <div className="technologies-Container">
        <img src={htmlLogo} alt="logo de HTML" />
        <img src={cssLogo} alt="logo de CSS" />
        <img src={jsLogo} alt="logo de JavaScript" />
        <img src={reactLogo} alt="logo de React" />
        <img src={sqlLogo} alt="logo de sql" />
      </div>
      <hr />
      <h3 className='about-text'>Mis redes sociales:</h3>
      <div className='social-Container'>
      <a href="https://www.linkedin.com/in/matias-camba-597060128/">
        <img src={likedinLogo} alt="Logo de LinkedIn" />
      </a>
      <a href="https://github.com/MatiasCamba?tab=repositories">
        <img src= {githubLogo} alt="Logo de GitHub" />
      </a>
      </div>
      </div>
  
  )
}

export default About