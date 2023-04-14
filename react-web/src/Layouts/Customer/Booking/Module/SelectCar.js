import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SelectService from "./SelectService";

const SelectCar = () => {
  const [haveCar, setHaveCar] = useState(false);
  const [ownCar, setOwnCar] = useState("");
  const [status, setStatus] = useState(false);
  const [order, setOrder] = useState({});
  const token = localStorage.getItem("token");

  const fetchCar = async () => {
    const res = await axios.get("http://localhost:5000/select-car", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.data;

    if (data.status === "No Car") {
      console.log("NO CAR");
    } else if (data.status === "OK") {
      setOwnCar(data.result);
      setHaveCar(true);
    } else if (data.status === "ERROR") {
      console.log(data.msg, " ", data.err);
    } else {
      console.log("err in react.js");
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  const selectedCar = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const car = selectedCar.current.value;

    const carId = car.split(" ")[0];

    const carSize = car.split(" ")[1];

    setStatus(true);
    setOrder({ ["carId"]: carId, ["carSize"]: carSize });
  };

  return (
    <div>
      {status ? (
        <SelectService order={order} />
      ) : haveCar ? (
        <form onSubmit={handleSubmit}>
          <select ref={selectedCar}>
            {ownCar.map((item) => {
              return (
                <option
                  key={item.id}
                  value={item.id + " " + item.size}
                  label={item.id + " " + item.size}
                ></option>
              );
            })}
          </select>
          <button type="submit">Submit</button>
        </form>
      ) : (
        "NO"
      )}

    </div>
  );
};

export default SelectCar;
