import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Footer from './components/Footer';

function App() {
  
  return (
    <>
    <Navbar/>
    
    {/* <div className='min-h-[83vh]'> */}
    <div className="bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <Manager/>
    </div>
    {/* </div> */}
    <Footer/>
    </>
  )
}

export default App
