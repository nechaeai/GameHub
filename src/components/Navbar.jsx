import React from 'react'
import {Link} from 'react-router-dom'
import './NavbarStyles.css'

const Navbar = () => {
  return (
  
        <header>
            <nav className='navbar'>
            
       
                    <ul className="nav-menu">
                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>RPS</Link>
                    </li>
             
                    <li className='nav-item'>
                        <Link to='/tic-tac' className='nav-link'>tic-tac</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/contact' className='nav-link'>Contact</Link>
                    </li>
                    </ul>
              
          
            </nav>
        </header>
     
  )
}

export default Navbar
