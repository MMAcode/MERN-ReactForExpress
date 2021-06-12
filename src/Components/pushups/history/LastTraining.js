import React from 'react';
import styled from 'styled-components';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LabelList, ResponsiveContainer, Label } from 'recharts';

export const SPTiny = styled.p`
margin:0;
`
const LastTraining = ({ data, viewType }) => {
  const [repsSum, setRepsSum] = React.useState(-1);
  const [timeInMinutes, setTimeInMinutes] = React.useState(-1);
  const calculateRepsSum = () => {
    let repsSumCalc;
    if (repsSum === -1) {
      repsSumCalc = data.sets.reduce((acc, set) => acc + set.reps
        , 0);
      setRepsSum(repsSumCalc);
    }
  }

  const calcTrainingTime = () => {
    function differenceInMinutes(dt2, dt1) {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
    }
    if (timeInMinutes === -1) {
      if (data.sets.length === 0) { setTimeInMinutes(0); return; };
      // console.log("DATA:",data);
      // console.log("DATAd:",data.date);
      let td = differenceInMinutes(new Date(data.date), new Date(data.sets[0].date));
      setTimeInMinutes(td);
    }
  }

  const getSimpleDateIfTrueAlsoTime = (withTime) => {
    var d = new Date(data.date);
    var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    var dateStr = date + "/" + month + "/" + year;
    var dateWithTimeStr = dateStr + '  ' + d.getHours() + ':' + d.getMinutes();
    return withTime ? dateWithTimeStr : dateStr;
  }

  React.useEffect(() => {

  }, [])

  const getTrainingDataToChart = (tr) => {
    let sets = tr.sets;
    let dataForChart = [];
    let setsNr = sets.length;
    for (let i = setsNr - 1; i >= 0; i--) {
      let set = sets[i];
      let setInfo = {
        setNumber: `set ${setsNr - i}`,
        reps: set.reps,
        repsNotes: set.repsNotes,
        // breakDuration: set.breakDuration,
        breakDuration: i === 0 ? 0 : 5,
        breakDurationS: set.breakDuration ? set.breakDuration + ' s.' : null,
      };
      // let breakInfo = { key: 'break', data: set.breakDuration ? set.breakDuration : 0 };
      dataForChart.push(setInfo);
    }
    // console.log("dataForChart3: ", dataForChart);
    return dataForChart;
  }




  calculateRepsSum();
  calcTrainingTime();

  if (viewType === 'currentPlanView') {
    return (
      <p>
        <span>{getSimpleDateIfTrueAlsoTime()}: {repsSum} reps</span>
      </p>
    )
  }

  return (
    <div style={{ backgroundColor: 'lightBlue' }} className='historyElementContainer'>
      <h2 style={{ display: 'flex' }}>Training</h2>
      <p>{getSimpleDateIfTrueAlsoTime(true)}</p>

      <div style={{}}>
        <SPTiny style={{ textAlign: 'center' }}>{repsSum} reps done in {timeInMinutes} munites.</SPTiny>
        <ResponsiveContainer height={200} width="95%" >
          {/* <BarChart width={350} height={350} margin={{ top: 25 }} data={getTrainingDataToChart(data)}> */}
          <BarChart margin={{ top: 25, left: 15 }} data={getTrainingDataToChart(data)}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="setNumber" />
            <YAxis >
              <Label value="Reps" angle={-90} position='insideLeft' />
            </YAxis>
            <Tooltip />
            {/* <Legend verticalAlign="top" height={56} /> */}
            {/* <Legend/> */}
            <Bar dataKey="reps" fill="#8884d8" >
              <LabelList dataKey="reps" position="top" />
            </Bar>
            <Bar dataKey="breakDuration" fill="#bfbfbfa1" >
              <LabelList dataKey="breakDurationS" position="inside" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* {data.sets.map((set, index) => <SPTiny key={index}>{index + 1}) {set.reps} reps {set.repsNotes && "(" + set.repsNotes + ")"}</SPTiny>)} */}
      <h5>Notes:</h5>
      {data.sets.slice(0).reverse().map((set, index) => <SPTiny key={index}>Set {index + 1}: {set.repsNotes && "(" + set.repsNotes + ")"}</SPTiny>)}
      {/* <SPTiny>TOTAL: {repsSum} reps</SPTiny> */}
      {/* <p>Training duration (in minutes): {timeInMinutes}</p> */}

    </div>
  );
};

export default LastTraining;