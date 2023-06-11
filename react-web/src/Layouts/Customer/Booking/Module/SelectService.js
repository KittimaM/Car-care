import axios from "axios";
import React, { useEffect, useState } from "react";
import SelectCar from "./SelectCar";
import SelectTime from "./SelectTime";

const SelectService = (props) => {
  let time = 0;
  let price = 0;

  const [order, setOrder] = useState(props.order);

  const [totalTime, setTotaltime] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [haveService, setHaveService] = useState(false);
  const [chooseService, setChoosService] = useState(false);
  const [status, setStatus] = useState(false);
  const [cancel, setCancel] = useState(false);

  const fetchService = async () => {
    const res = await axios.post(
      "http://localhost:5000/select-service",
      { size: props.order.carSize },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.data;
    if (data.status === "OK") {
      setHaveService(true);
      setService(data.result);
      // console.log("data.result : ",service);
    } else if (data.status === "NO SERVICE") {
      console.log("NO SERVICE");
    } else if (data.status === "ERROR") {
      console.log(data.err);
    } else {
      console.log("err in react.js");
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  const handleCheckBox = (event) => {
    const { value } = event.target;
    if (event.target.checked) {
      setSelectedService([...selectedService, value]);
    } else {
      setSelectedService(selectedService.filter((item) => item !== value));
    }
    // setSelectedService([...selectedService, event.target.value]);
  };

  const handleSelect = (event) => {
    event.preventDefault();
    // console.log(selectedService);
    service.map((item) => {
      selectedService.map((selected) => {
        // do not edit below code
        if (selected == item.id) {
          time += item.use_time;
          price += item.price;
        }
      });
    });

    const keyService = "service";

    setOrder({ ...order, [keyService]: selectedService });

    setTotalPrice(price);
    setTotaltime(time);
    setChoosService(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const keyTime = "totalTime";
    const keyPrice = "totalPrice";
    setOrder({
      ...order,
      [keyTime]: totalTime,
      [keyPrice]: totalPrice,
    });
    console.log("order is ", order);
    setStatus(true);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setOrder({});
    // window.location = "/booking";
    setCancel(true);
  };

  if (cancel) {
    return <SelectCar />;
  }

  if (status) {
    return <SelectTime order={order} />;
  }

  return (
    <div>
      <h1>{order.carId}</h1>

      {chooseService ? (
        <form onSubmit={handleSubmit}>
          {/* display service */}
          total time is {totalTime} minutes And total price is {totalPrice} bath
          <button type="submit">Submit</button>
        </form>
      ) : haveService ? (
        <form onSubmit={handleSelect}>
          {service.map((item) => {
            return (
              <div key={item.id}>
                <input
                  type="checkbox"
                  value={item.id}
                  onChange={handleCheckBox}
                  checked={selectedService.includes(`${item.id}`)}
                />
                <label key={item.id}>{item.type}</label>
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      ) : (
        "NO SERVICE AVALIABLE"
      )}

      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default SelectService;
