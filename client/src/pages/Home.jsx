import React from 'react'
import Hero from '../Components/Hero'
import Department from '../Components/Department'
import Message from '../Components/Message'
import Bio from '../Components/Bio'
import heroimage from '../assets/hero1.svg';
import AboutImg from '../assets/about.svg';

function Home() {
  return (
<>
<Hero title={"Welcome To"} imageUrl={heroimage} dec={"Student Hub"}/>
<Bio imageUrl={AboutImg}/>
<Department />
<Message />

</>
  )
}

export default Home