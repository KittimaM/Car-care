import axios from "axios";
import React, { useEffect, useState } from "react";
import SelectCar from "./SelectCar";

const SelectService = (props) => {
  let time = 0;
  let price = 0;

  const [order, setOrder] = useState(props.order);
  console.log("order ", order);

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
        if (selected == item.id) {
          console.log(item);
          time += item.use_time;
          price += item.price;
        }
      });
    });

    setOrder({ ...order, ["service"]: selectedService });

    setTotalPrice(price);
    setTotaltime(time);
    setChoosService(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrder({
      ...order,
      ["total_time"]: totalTime,
      ["total_price"]: totalPrice,
    });
    console.log("order is ", order);
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

  return (
    <div>
      <form onSubmit={handleCancel}>
        <h1>{order.carId}</h1>
        <button type="submit"> Cancel</button>
      </form>

      {haveService ? (
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
      {chooseService && (
        <form onSubmit={handleSubmit}>
          total time is {totalTime} minutes And total price is {totalPrice} bath
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default SelectService;
