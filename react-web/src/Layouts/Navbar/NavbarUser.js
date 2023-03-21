import React , { Component  } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./NavbarUser.css"
import { MenuItems } from './MenuItemUser';



class NavbarUser extends Component {
    state = {clicked : false};
    handleClick = () =>{
        this.setState({ clicked : !this.state.clicked})
    }

    render() {
        
        return (
            <>
                <nav className="NavbarItems">
                    
                    <h1 className = "navbar-logo"> 
                        <i className="fa-solid fa-car"></i>
                        Carcare
                    </h1>
    
                    <div className="menu-icons" onClick={this.handleClick}>
                
                        <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                    
                    
                    <ul className={this.state.clicked ? "nav-menu active" : "nav-menu "}>
                        {MenuItems.map((item, index) =>{
                            return(
                            <li key={index}>
                                <a className ={item.cName} href= "/">
                                    <i className={item.icon}></i>{item.title}
                                </a>
                            </li>
                            )
                        })}
    
                        
                        <NavLink to="/login" className="btn-navlink" >
                            <button className='btn-login'>Login</button>
                        </NavLink>
                    
                        <button >Sign Up</button>

                    </ul>
                  
                </nav>
           
                
            </>
        )
    }

    }
   
    
export default NavbarUser