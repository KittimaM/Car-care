import React from "react";
import NavStaff from "../../Navbar/NavStaff";
import "./queue.css"



function Queue(){

    return (
        <div>
            
        
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
                    <span className="number">1565</span>
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
};

export default Queue;



