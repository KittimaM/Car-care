import "./Hero-bg.css"

function Hero(){
    return(
        <>
            <div className="hero">
                <img alt="Cars" src="https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>
            </div>

            <div className="hero-text">
                <h1>Your car is my life</h1>
                <p>Choose service for your car</p>
                <a href="/" className="show">
                    Booking
                </a>
            </div>

        </>

    );
}

export default Hero;