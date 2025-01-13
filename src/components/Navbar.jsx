// import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer  flex justify-between items-center px-4 py-5 h-14">
        
        {/* Logo */}
          <div className="logo font-bold text-white text-2xl">
            <span className='text-green-600'>&lt;</span>
            Key<span className='text-green-600'>Sential/&gt;</span>
          </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold'href='/'>Home</a>
                <a className='hover:font-bold'href='#'>About</a>
            </li>
        </ul> */}
        <div>
          <button className="text-white  my-4 " 
            onClick={() => window.open('https://github.com/Himanshu0273', '_blank')}
          >
            <img className="invert p-3 w-12" src="icons/github.png" alt="github logo" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar