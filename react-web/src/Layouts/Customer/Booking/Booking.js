import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Addnewcar from "./Addnewcar";
import { value1 } from "./Addnewcar";

const Booking = () => {
  const [car, setCar] = useState([]);
  const [selected, setSelected] = useState();
  const [isShow, setIsShow] = useState(false);
  const [haveCar, setHaveCar] = useState(false);
  const [service, setService] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.post(
      "http://localhost:5000/booking",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;
    if (data.status === "OK") {
      console.log(data.result);
      setCar(data.result);
      setHaveCar(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedcar = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    setSelected(selectedcar.current.value);
  };

  return (
    <div>
      {value1}
      {/* {isShow && <h1>{selected}</h1>}
      <form onSubmit={handleSubmit}>
        {haveCar ? (
          <select ref={selectedcar}>
            {car.map((item) => {
              return (
                <option key={item.id} label={item.id} value={item.id}></option>
              );
            })}
          </select>
        ) : (
          <Addnewcar />
        )}

        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default Booking;
