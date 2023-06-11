import React from "react";

const SelectTime = (props) => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const dateString = tomorrow.toLocaleDateString("th-TH");

  return (
    <div>
      <p>Tomorrow's date in Thailand is {dateString}.</p>
    </div>
  );
};

export default SelectTime;
