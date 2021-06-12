import React from 'react';

const UsabilityInfo = ({ usability }) => {
  console.log("usability UUU: ", usability);
  return (
    // <div style={{backgroundColor:'gray'}}>
    <div>
      {/* <h5>Data Usability</h5> */}
      <h5>Consistency</h5>
      <p>Rating: {usability.rating}%</p>
      <p>Days off the schedule: {usability.daysOffSchedule}</p>
      <p>Unfinished Trainings: {usability.unfinishedTrainings}</p>
    </div>
  );
};

export default UsabilityInfo;