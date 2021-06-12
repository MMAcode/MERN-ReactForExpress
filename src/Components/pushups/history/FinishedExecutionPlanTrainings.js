import React from 'react';
import LastTraining from './LastTraining';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LabelList, ResponsiveContainer, Label } from 'recharts';
import { withRouter } from 'react-router-dom';
import { returnAnyPlanFromPlanID } from '../functions/basics';
import UsabilityInfo from './UsabilityInfo';
import PushUpsContext from '../state/PushUpsContextState';
import { clippingParents } from '@popperjs/core';

// const xAxisLabelMiro = "Day of the month (training number)";

// const xAxisLabelMiro = () => {
//   return (
//     <text>
//       test x
//     </text>
//   );
// }


export const getSimpleDateIfTrueAlsoTime = (dateReceived, withTime = false, withYear = false,) => {
  var d = new Date(dateReceived);
  var date = d.getDate();
  var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();
  var dateStr = date + "/" + month;
  dateStr += withYear ? ("/" + year) : '';
  var dateWithTimeStr = dateStr + '  ' + d.getHours() + ':' + d.getMinutes();
  return withTime ? dateWithTimeStr : dateStr;
}

const returnPersonalPlanFromPlanID = (personalPlans, planID) => {
  // console.log(planID, personalPlans);
  return personalPlans.find(plan => plan._id === planID)
}

const returnPersonalPlanPositionFrom0FromPlanID = (personalPlans, planID) => {
  // console.log(planID, personalPlans);
  let index;
  personalPlans.find((plan, i) => {
    index = i;
    return plan._id === planID
  });
  console.log("index: ", index);
  return index;
}

const TrainingsOfLatestPlan = ({
  trainingSHistory,
  currentPlanExecution,
  // assessments,
  // personalPushupPlans,
  // history
}) => {

  let { publicPlans } = React.useContext(PushUpsContext);
  const [showTrainingDetails, showTrainingDetailsSET] = React.useState({});
  // React.useEffect(() => { console.log("showTrainingDetails: ", showTrainingDetails) }, [showTrainingDetails])

  //scroll to the end of the current plan chart, if it exists
  const elementOfCurrentPlanHistory = React.useRef(null);
  React.useEffect(() => {
    if (elementOfCurrentPlanHistory.current) elementOfCurrentPlanHistory.current.scrollLeft += 2000;
  }, [trainingSHistory]);

  if (trainingSHistory === null) return null;


  const getTrainingSDataToChart = (trainings) => {

    const returnTotalReps = (training) => {
      return training.sets.reduce((acc, set) => acc + set.reps, 0);
    }
    const returnTrainingTimeInMinutes = (training) => { //returns 0 if training has no sets in it
      if (!training.sets || training.sets.length === 0) return 0;
      function differenceInMinutes(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
      }
      return differenceInMinutes(new Date(training.date), new Date(training.sets[0].date));
    }

    let dataForChart = [];
    let numberOfTrainings = trainings.length;

    //for each training...
    for (let i = numberOfTrainings - 1; i >= 0; i--) {
      let training = trainings[i];
      let trainingInfoForChart = {
        date2: getSimpleDateIfTrueAlsoTime(training.date, false),
        date: new Date(training.date).getDate(),
        trainingNumber: (training.trainingNumber ? '(' + training.trainingNumber + ')' : ''),
        trainingName: 'Name?',
        trainingNrAName: 'tr.Nr (Name)?',
        trainingNotes: 'Notes?',
        trainingDurationInMinutes: (returnTrainingTimeInMinutes(training) ? returnTrainingTimeInMinutes(training) + 'm' : ''),
        repsInTotal: returnTotalReps(training) > 0 ? returnTotalReps(training) : null
      };
      dataForChart.push(trainingInfoForChart);
    }
    // console.log("dataForChart: ", dataForChart);
    return dataForChart;


  }





  return (
    <div
      className='historyElementContainer'
      style={{ backgroundColor: 'pink' }}
    >
      <h5>Trainings history:</h5>
      {trainingSHistory.map((training, index) => <div key={index}>
        <button onClick={() => showTrainingDetailsSET(before =>({ ...before, [`tr${index}`]: before[`tr${index}`] ? false : true }))}>
          <LastTraining data={training} viewType='currentPlanView' />
        </button>
        {showTrainingDetails[`tr${index}`] && <LastTraining data={training} />}
      </div>)}


      <div
        style={{ display: 'flex', flexWrap: 'no-wrap', overflowX: 'auto' }}
        ref={elementOfCurrentPlanHistory}
      >
        <ResponsiveContainer height={200} minWidth={trainingSHistory.length * 40} >
          {/* <BarChart width={350} height={350} margin={{ top: 25 }} data={getTrainingDataToChart(data)}> */}
          <BarChart margin={{ top: 25, left: 15, bottom: 35 }} data={getTrainingSDataToChart(trainingSHistory)}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <XAxis dataKey={`${trainingNumber} (${trainingName})`} /> */}
            <XAxis dataKey="date" >
              <Label value="Day of the month (training number)" position='bottom' />
              {/* <Label content={<xAxisLabelMiro />} position='bottom' /> */}
            </XAxis>
            <YAxis >
              <Label value="Reps" angle={-90} position='insideLeft' />
            </YAxis>
            <Tooltip />
            {/* <Legend verticalAlign="top" height={56} /> */}
            {/* <Legend/> */}
            <Bar dataKey="repsInTotal" fill="#8884d8" >
              <LabelList dataKey="repsInTotal" position="top" />
              {/* <LabelList dataKey="trainingNotes" position="center" /> */}
              <LabelList dataKey="trainingNumber" position="insideBottom" />
              <LabelList dataKey="trainingDurationInMinutes" position="center" />

              {/* <LabelList dataKey="trainingName" position="insideBottomRight" /> */}
              {/* <LabelList dataKey="reps" position="insideTop" /> */}
            </Bar>
            {/* <Bar dataKey="breakDuration" fill="#bfbfbfa1" >
              <LabelList dataKey="breakDurationS" position="inside" />
            </Bar> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default withRouter(TrainingsOfLatestPlan);