import React from "react";

import axios from "axios";
const CheckinStaff = () => {
  const handlecheckin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      id: data.get("checkin_id"),
      password: data.get("checkin_password"),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:5000/api/checkin-staff", jsonData, config)
      .then((res) => {
        const data = res.data;
        alert(data.status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* แก้ checkin ให้ ดึงค่าจากคนที่login แล้วเหลือแค่กดปุ่มเช็คอิน */}
      <h1>Check in</h1>
      <form onSubmit={handlecheckin}>
        <div className="form-group">
          <label>staff ID</label>
          <input type="text" name="checkin_id" placeholder="id" required />
        </div>
        <div className="form-group">
          <label>password</label>
          <input
            type="password"
            name="checkin_password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckinStaff;
