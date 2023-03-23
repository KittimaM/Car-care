import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Addnewcar = () => {
  const [carsize, setCarSize] = useState([]);

  const fetchSize = async () => {
    const res_size = await axios.post(
      "http://localhost:5000/show-car-size",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = res_size.data;

    if (data.status === "OK") {
      setCarSize(data.result);
    }
  };

  useEffect(() => {
    fetchSize();
  }, []);

  return (
    <div>
      <select>
        {carsize.map((item, index) => {
          return (
            <option
              key={index}
              label={item.car_size}
              value={item.car_size}
            ></option>
          );
        })}
      </select>
    </div>
  );
};

export default Addnewcar;

export let value1 = "hello";
