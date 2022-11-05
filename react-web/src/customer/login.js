import React from "react";
import { useEffect, useState } from "react";

function login() {
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
      {items.map((item) => (
        <h2>
          {item.id} : {item.descr} : {item.price}
        </h2>
      ))}
    </div>
  );
}

export default login;
