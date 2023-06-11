import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { SidebarData } from './SidebarData';
import './SidebarNavSt.css';

function SidebarNavSt() {
  return (
    <>
        
        <nav className='nav-menu'>

            {/* <div className="logo-name">
              
              <div className="logo-image">
                <img src = "../image/S__18923539.jpg" alt="carbuki logo"></img> 
                
              </div>
            
            </div> */}

            <ul className='nav-menu-items'>
              
                {SidebarData.map((item,index)=> {
                    return (
                        <li key={index} className={item.cName}>
                            <NavLink to={item.path} >
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
       


        
    </>
  )
}

export default SidebarNavSt