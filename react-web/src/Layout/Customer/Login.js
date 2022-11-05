import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/login")
        .then((res) => res.json())
        .then((result) => {
          setItems(result);
        });
    }, []);
    return (
      <div>
        {items.map((item) => (
          <h2>{item.id} : {item.descr} : {item.price}</h2>
        ))}
      </div>
    );
}

export default Login