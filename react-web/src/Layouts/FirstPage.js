import React, { useState } from "react";

function FirstPage() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleClick = () => {
    setErrorMessage("Example error message!");
  };
  return (
    <div>
      <button onClick={handleClick}>Show error message</button>
      {errorMessage && <div> {errorMessage} </div>}
    </div>
  );
}

export default FirstPage;
