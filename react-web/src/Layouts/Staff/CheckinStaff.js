import React from "react";
import NavStaff from "../Navbar/NavStaff";
import axios from "axios";
const CheckinStaff = () => {
  async function updateData() {
    const data = { id: "100009", password: "2000" };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:5000/checkin-staff", data, config)
      .then((res) => {
        const data = res.data;
        alert( data.status);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <NavStaff />
      CheckinStaff
      <button onClick={updateData}>update api</button>
    </div>
  );
};

export default CheckinStaff;
