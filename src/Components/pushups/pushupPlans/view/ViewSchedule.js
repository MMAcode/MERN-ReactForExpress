import React from 'react';

const ViewSchedule = ({ schedule }) => {
  // console.log(schedule);
  return (
    <div>
      <h2>Schedule</h2>
    <div className='viewScheduleGrid'></div>
      <div style={{ display: 'inline' }}>Day</div>
      <div style={{ display: 'inline' }}> Training number</div>
      {schedule.map((day, i) =>
        <div key={i}>
          <div style={{ display: 'inline' }}>{i + 1})</div>
          <div style={{ display: 'inline' }}> {i===0? `Initial assessment ${day.trainingNumber > 0 && `and training ${day.trainingNumber}`}`: i === 13 ? 'Final assessment day' : (day.trainingNumber === 0 ? 'Rest day' : `${day.trainingNumber}`)}</div>
        </div>
      )}
    </div>)
}

export default ViewSchedule;