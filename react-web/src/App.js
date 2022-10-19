import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);
  return (
    <div>
      <h1>Kittima Edit in firstPage</h1>
      {items.map((item) => (
        <h2>{item.id} : {item.descr} : {item.price}</h2>
      ))}
    </div>
  );
}

export default App;
