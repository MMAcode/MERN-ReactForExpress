import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LabelList, ResponsiveContainer, Label, Cell } from 'recharts';
import { getSimpleDateIfTrueAlsoTime } from './CurrentPlan';
import { SPTiny } from './LastTraining';
import { Accordion, Card } from 'react-bootstrap';
import styled from 'styled-components';

const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
background-color: rgba(233, 154, 7, 0.62);
margin: 0 5px 8px 5px;
`

const getAssessmentsDataToChart = (assessments) => { //returns null if no assessments

  if (assessments === null || assessments === undefined || assessments.length < 1) return null;

  let dataForChart = [];
  let numberOfAss = assessments.length;

  //for each training...
  for (let i = numberOfAss - 1; i >= 0; i--) {
    let ass = assessments[i];
    let assInfoForChart = {
      date: {
        dayMonth: getSimpleDateIfTrueAlsoTime(ass.date),
        year: new Date(ass.date).getFullYear() + '',
        full: getSimpleDateIfTrueAlsoTime(ass.date, true, true)
      },
      reps: ass.reps,
      notes: ass.notes
    };
    dataForChart.push(assInfoForChart);
  }
  console.log("ASSdataForChart: ", dataForChart);
  return dataForChart;
}


const renderCustomizedLabel = (props) => {
  const {
    x, y, width, height, value,
  } = props;
  const radius = 20;

  return (
    <g>
      {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#1184d8" /> */}
      {/* <text x={x + width / 2} y={y - radius} fill="#000000" textAnchor="middle" dominantBaseline="middle"> */}
      <text x={x + width / 2} y={160} fill="#000000" textAnchor="middle" dominantBaseline="middle">
        {/* {value.split(' ')[1]} */}
        {value}
      </text>
      {/* <text x={x + width / 2} y={210} fill="#000000" textAnchor="middle" dominantBaseline="middle">
        {value.dayMonth}
      </text> */}
    </g>
  );
};
const renderCustomizedLabel2 = (props) => {
  const {
    x, y, width, height, value,
  } = props;
  const radius = 20;

  return (
    <g>
      {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#1184d8" /> */}
      {/* <text x={x + width / 2} y={y - radius} fill="#000000" textAnchor="middle" dominantBaseline="middle"> */}
      <text x={x + width / 2} y={180} fill="#000000" textAnchor="middle" dominantBaseline="middle">
        {/* {value.split(' ')[1]} */}
        {value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {   //label == "name" property!!
  if (active) {
    // console.log("payload:", payload);
    return (
      <div style={{ backgroundColor: 'lightGray', padding: '10px', maxWidth: '200px' }}>
        <SPTiny>{payload[0].payload.date.full}</SPTiny>
        <SPTiny>{payload[0].payload.notes} </SPTiny>
      </div>
    );
  }

  return null;
};

const AssessmentsHistory = ({ assessments }) => {
 //scroll to the end of the current plan chart, if it exists
 const elementOfCurrentPlanHistory = React.useRef(null);
 React.useEffect(() => {
   if (elementOfCurrentPlanHistory.current) elementOfCurrentPlanHistory.current.scrollLeft += 2000;
 }, [assessments]);

  return (
    <div
      className='historyElementContainer'
      style={{ backgroundColor: 'orange' }}
    >
      <h2>Assessments</h2>
      {(assessments && assessments.length > 0) ?
        <>
          <div
            style={{ display: 'flex', flexWrap: 'no-wrap', overflowX: 'auto' }}
            ref={elementOfCurrentPlanHistory}
          >
            <ResponsiveContainer height={200} minWidth={assessments.length * 40} >
              {/* <BarChart width={350} height={350} margin={{ top: 25 }} data={getTrainingDataToChart(data)}> */}
              <BarChart margin={{ top: 25, left: 15, bottom: 55 }} data={getAssessmentsDataToChart(assessments)}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <XAxis dataKey="date.dayMonth" > */}
                {/* <XAxis dataKey="" > */}
                {/* <XAxis > */}
                {/* <Label value="date" position='bottom' /> */}
                {/* <LabelList dataKey="reps" position="top" content={renderCustomizedLabel}/> */}

                {/* </XAxis> */}
                <YAxis >
                  <Label value="Reps" angle={-90} position='insideLeft' />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend verticalAlign="top" height={56} /> */}
                <Bar dataKey="reps" fill="#8884d8" >
                  {/* <LabelList dataKey="reps" position="top" /> */}
                  <LabelList dataKey="reps" position="top" />
                  {/* <LabelList dataKey="reps" position="top" content={renderCustomizedLabel}/> */}
                  {/* <LabelList dataKey="date" position="bottom" content={renderCustomizedLabel} /> */}
                  <LabelList dataKey="date.dayMonth" position="bottom" content={renderCustomizedLabel} />
                  <LabelList dataKey="date.year" position="bottom" content={renderCustomizedLabel2} />

                  {
                    assessments.map((entry, index) => (
                      <Cell key={index} fill={assessments.length === index + 1 ? "#ff0000" : "#8884d8"} />
                    ))
                  }
                  {/* <Cell key={index} stroke={assessments.length===index+1 ? "#ff0000":"#000000"} strokeWidth={assessments.length===index+1 ? 1 : 1} /> */}

                </Bar>
                {/* <Bar dataKey="breakDuration" fill="#bfbfbfa1" >
              <LabelList dataKey="breakDurationS" position="inside" />
            </Bar> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Accordion className='p-1' style={{ margin: '0px 10px 0px 20px', background: 'transparent' }}>
            {/* <Card style={{background:'transparent', border:'none'}} > */}
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="1"
                className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
              // style={{background:'white',margin:'0px 60px 0px 60px'}}
              >
                Your Notes 🔽
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <SCard style={{ maxHeight: '100vh', overflowY: 'auto', backgroundColor: 'white' }}>
                  {/* <p>(assuming reps needs to be logged, not time)</p> */}
                  {assessments.map((ass, index) => {
                    {/* return (<div key={index} style={{margin:'3px',backgroundColor:'lightGray', marginBottom:'10px'}}> */ }
                    return (<div key={index}>
                      <SPTiny >{getSimpleDateIfTrueAlsoTime(ass.date, true, true)}</SPTiny>
                      <SPTiny style={{ paddingLeft: '10px' }}>{ass.notes && ass.notes}</SPTiny>
                      {ass.notes && <br />}
                    </div>)
                  })}

                </SCard>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </ >
        : <p>No assessments done yet</p>}

    </div>
  );
};

export default AssessmentsHistory;