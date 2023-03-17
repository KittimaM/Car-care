import React , { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./NavbarUser.css"
import { MenuItems } from './MenuItemUser';

function NavbarUser() {
    
    return (
        <>
            <nav className="NavbarItems">
                
                <h1 className = "navbar-logo"> 
                    <i className="fa-solid fa-car"></i>
                    Carcare
                </h1>
                
                
                <ul className='nav-menu'>
                    {MenuItems.map((item, index) =>{
                        return(
                        <li key={index}>
                            <a className ={item.cName} href= "/">
                                <i className={item.icon}></i>{item.title}
                            </a>
                        </li>
                        )
                    })}

                    <button >Login</button>
                </ul>
              
            </nav>
    
            
        </>
    )
}
    
export default NavbarUser