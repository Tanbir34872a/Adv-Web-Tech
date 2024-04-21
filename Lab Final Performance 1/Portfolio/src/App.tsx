import { useState } from 'react'
import profilepic from './component/1693328286806.jpeg'
import viteLogo from '/vite.svg'
import './App.css'
import Heading from './component/heading'
import Intro from './component/intro'
import Edu from './component/education'
import './component/edu.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={profilepic} style={{ width: 200, height: 200 }} alt="My Profile Pic" />
      <Heading />
      <Intro />
      <Edu/>
    </>
  )
}

export default App
