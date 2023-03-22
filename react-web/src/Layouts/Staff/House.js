import React from "react";
import "./house.css";


function House() {

  return(
      <div className="bodys"> 
        <nav>

          <div>
            <div className="logo-name">
              
              <div className="logo-image">
                <img src = "../image/S__18923539.jpg" alt="carbuki logo"></img> 
                
              </div>
              {/* <span className="logo_name"> </span>  */}
            
            </div>
          </div>

          <div className="menu-items">
            <ul className="nav-links"> 

            <li><a href = '#' > 
                    <i class="fa-sharp fa-solid fa-city"></i>
                    <span className="link-name"> Queue </span>
                </a></li>

                <li><a href = '#' > 
                    <i class="fa-sharp fa-solid fa-city"></i>
                    <span className="link-name">  Customer</span>
                </a></li>

                <li><a href = '#' > 
                    <i class="fa-sharp fa-solid fa-city"></i>
                    <span className="link-name"> Time Stamp </span>
                </a></li>

                <li><a href = '#' > 
                    <i class="fa-sharp fa-solid fa-city"></i>
                    <span className="link-name"> Promotion </span>
                </a></li>

                <li><a href = '#' > 
                    <i class="fa-sharp fa-solid fa-city"></i>
                    <span className="link-name"> Employee Schedule </span>
                </a></li>

            </ul>

            <ul className="logout-mod">

                <li><a href = '#' > 
                  <i class="fa-sharp fa-solid fa-right-from-bracket"></i>
                  <span className="link-name"> Logout </span>
                </a></li>

                {/* <li><a href = '#' > 
                  <i class="fa-solid fa-moon"></i>
                  <span className="link-name"> Dark Mode </span>
                </a></li>  */}

            </ul>
          </div>
        </nav> 

        <section className="dashboard">
          <div className="top">

            <div className="search-box">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Seach here"></input>
            </div>

            <span className=""> Kittima Moolamart </span>
            <img src="../image/delivery-boy.png" alt = "Admin" ></img>



          </div>

        </section>
      </div>
      
        

    
    );
  }
  
  export default House;



