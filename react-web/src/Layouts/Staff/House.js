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

          <div className="dash-content">
            <div className="overview">
              <div className="title">
                  <i class="fa-solid fa-car"></i>
                  <span className="text">Queue</span>
              </div>

              <div className="boxes">

                <div className="box box1">
                  <i class="fa-solid fa-car"></i>
                  <span className="text">Wait</span>
                  <span className="number">20</span>
                </div>

                <div className="box box2">
                  <i class="fa-solid fa-car"></i>
                  <span className="text">Total Queue</span>
                  <span className="number">20</span>
                </div>

                <div className="box box3">
                  <i class="fa-solid fa-car"></i>
                  <span className="text">Total payment</span>
                  <span className="number">20</span>
                </div>

              </div>

            </div>

          

          <div className="activity"> 
              <div className="title">
                <i class="fa-regular fa-thumbs-up"></i>
                <span className="text">List</span>
              </div>

              <div className="activity-data">

                <div className="data car">
                  <span className="data-title">Car number</span>
                  <span className="data-lish">กส 956</span>
                  {/* <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span> */}
                </div>

                <div className="data names">
                  <span className="data-title">Name</span>
                  <span className="data-lish">Phattraporn Bunjongket</span>
                  {/* <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span> */}
                </div>

                <div className="data phone">
                  <span className="data-title">Phone Number</span>
                  <span className="data-lish">0897725322</span>
                  {/* <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span> */}
                </div>


                <div className="data joine">
                  <span className="data-title">Time</span>
                  <span className="data-lish">12.30</span>
                  {/* <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span> */}
                </div>

                <div className="data type">
                  <span className="data-title">Service</span>
                  <span className="data-lish">wash</span>
                  {/* <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span>
                  <span className="data-lish">hello kitty</span> */}
                  
                </div>

                
                <button> Finish </button>
                
              </div>
          </div>
          </div>
        </section>
      </div>
      
    
    );
  }
  
  export default House;



