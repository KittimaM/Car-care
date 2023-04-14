import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import NavCus from "../../Navbar/NavCus";
import SelectService from "./Module/SelectService";
import SelectCar from "./Module/SelectCar";
const Booking = () => {
  return (
    <div>
      <NavCus />
      <SelectCar />
    </div>
  );
};

export default Booking;
