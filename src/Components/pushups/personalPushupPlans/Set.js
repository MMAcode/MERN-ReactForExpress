import React from 'react';
import PlanContext from './ContextDefaults';

import imgMinus from '../img/minus.png';
import imgPlus from '../img/plus.png';
import imgMinusLight from '../img/minusLight.png';
import imgPlusLight from '../img/plusLight.png';

import styled from 'styled-components';
import CounterAllIn from '../basicComponents/CounterAllIn';

import { Accordion, Card } from 'react-bootstrap';
import positionElementToTheTop from '../functions/styling/positionElementToTheTop';

const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
/* background-color: rgba(233, 154, 7, 0.62); */
background-color: transparent;
margin: 0;
`

export const SSet = styled.div`
/* background-color: rgb(233, 225, 225); */
background-color: rgb(151, 151, 152);

p,span,input,textarea{
  font-size:1.3rem;
}
input,span,textarea{
  /* background-color:green; */
  background:none;
  /* background:linear-gradient(transparent 60%,red 100%); */
  border:none;
  /* border-bottom: 3px solid red; */
  padding:5px;
  /* width:auto; */
  width:60px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
span{
  font-weight:bold;
}
input{
    color:black;
    font-size:1.8rem;
    color:white;
    font-weight:bold;
    text-align: center;
    outline:none;
    
  }
/* hide native htmml counting arrows */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


/* textarea{
  background-color:green;
} */

padding:3%;
margin-bottom: 10px;
`;

const SSection = styled.div`
/* background-color: yellow; */
border: 5px solid black;
padding:10px;
/* padding:3%; */
p{margin:0;}
margin-bottom:5px;
button{
  text-align: center;
  display: block;
  margin:5px auto -7px auto !important;
  /* margin: auto !important; */
  background-color:#ddd1d1;
  outline:none;
  /* border:none; */
  &:hover{
    background-color:red ;
  /* opacity:1; */
  }
}
`;

const SNote = styled.div`
/* height:80px; */
/* border: dotted black 1px; */
background-color:lightgray;
p{
    border-bottom:dotted 1px white;
    padding-left:5px;
}
textarea{
  width:100%;
  height:100%;
  outline:none;
}
p, textarea{font-size:0.8rem;}
`;




export const SCounter = styled.div`
/* background-color:blue; */
/* background-image: url(${imgMinus}) no-repeat center center/cover; */
/* background: url("https://robohash.org/1") no-repeat center center/cover; */
/* background: url("https://robohash.org/1") no-repeat center center/cover; */

display:inline-box;
width:50px;
height:50px;
padding:0 3px;
position: relative;

touch-action: manipulation;

:hover{
    cursor:pointer;
  /* background: radial-gradient(circle, rgba(255,100,0,1) 34%, rgba(42,8,8,0) 70%); */

  }
  :active{
    img{background: radial-gradient(circle, rgb(215, 255, 0) 34%, rgba(42,8,8,0) 70%);}

  }
img{
  
  width:100%; 
  /* width:110px;  */
  /* height: 110px; */
  /* height: 100%; */
  height: auto;
  /* background:radial-gradient(red); */
  background: radial-gradient(circle, rgba(255,0,0,1) 34%, rgba(242,8,8,0) 70%);
  /* background:url(${imgPlus}); */
  /* background:url(imgPlus); */
 
}
#counterNumber{
}
div{
  margin: auto;
  position: absolute;
   top: 43%; 
   /* top: ${() => '44%'};  */
right: 50%; 
/* width:10px;height:10px; */
transform: translate(50%, -50%);
  z-index:10;
  /* content:  ${props => props.howMuch};  */
  content:  ${() => '7'}; 
  content:'6';

  font-size:0.8rem;
  font-weight:800;
  line-height:1rem;
  color: white; 

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

`;
export const SCounterSmall = styled(SCounter)`
width:30px;
height:30px;
div { 
  top:46%;
  font-size:0.5rem;
}
`;








const Set = ({ set, position, trainingPosition }) => {
  const thisSetRef = React.useRef();
  const { plan, updatePlan } = React.useContext(PlanContext);
  let { reps, repsAsPercentage, duration, repsNotes, breakAfterInSeconds, breakNotes, } = set;
  let repsCalculatedFromMaxAndPercentage;
  if (plan.repsAsPercentages && plan.maxRepsNeeded) {
    repsCalculatedFromMaxAndPercentage = Math.round(repsAsPercentage / 100 * plan.maxRepsNeeded.reps);
  }

  let repsOrDuration = (reps !== undefined) ? ['reps', 'duration'] : ['duration', 'reps'];
  position++; //so that set start with 1

  const updateRepsOrDuration = ({ target: { value } }) => {
    plan.trainings[trainingPosition - 1].sets[position - 1][repsOrDuration[0]] = value;
    // plan.trainings[trainingPosition - 1].sets[position - 1][repsOrDuration[1]] = undefined;
    // console.log("this is got value,other undefined:", [repsOrDuration[0]], plan.trainings[trainingPosition - 1].sets[position - 1][repsOrDuration[0]]);

    updatePlan({ ...plan });
  }

  const updateRepOrDurationNotes = ({ target: { value } }) => {
    let note = value;
    if (note && note.length > 0) { note = note.charAt(0).toUpperCase() + note.slice(1); }
    plan.trainings[trainingPosition - 1].sets[position - 1].repsNotes = note;
    updatePlan({ ...plan });
  }

  const toggleRepsDuration = () => {
    repsOrDuration = [repsOrDuration[1], repsOrDuration[0]];
    plan.trainings[trainingPosition - 1].sets[position - 1][repsOrDuration[0]] = plan.trainings[trainingPosition - 1].sets[position - 1][repsOrDuration[1]];
    plan.trainings[trainingPosition - 1].sets[position - 1][repsOrDuration[1]] = undefined;
    updatePlan({ ...plan });
  }

  const adjustBreakTime = ({ target: { value } }) => {
    plan.trainings[trainingPosition - 1].sets[position - 1].breakAfterInSeconds = value;
    updatePlan({ ...plan });
  }

  const adjustBreakNotes = ({ target: { value } }) => {
    let note = value;
    if (note && note.length > 0) { note = note.charAt(0).toUpperCase() + note.slice(1); }
    plan.trainings[trainingPosition - 1].sets[position - 1].breakNotes = note;
    updatePlan({ ...plan });
  }

  const duplicateSet = () => {
    let currentSet = plan.trainings[trainingPosition - 1].sets[position - 1];
    const newSet = { ...currentSet }; //can be done ad set doesn't objects or arrays
    plan.trainings[trainingPosition - 1].sets.push(newSet);
    updatePlan({ ...plan });
  }

  const deleteSet = () => {
    plan.trainings[trainingPosition - 1].sets.splice(position - 1, 1);

    const oldSets = plan.trainings[trainingPosition - 1].sets;
    const newSets = [...oldSets];
    plan.trainings[trainingPosition - 1].sets = newSets;

    updatePlan({ ...plan });
  }

  const adjust = (howMuch, what) => {

    plan.trainings[trainingPosition - 1].sets[position - 1][what] += howMuch;
    if (plan.trainings[trainingPosition - 1].sets[position - 1][what] <= 0) plan.trainings[trainingPosition - 1].sets[position - 1][what] = 0;
    // console.log("this is got value,other undefined:", [repsOrDuration[0]], plan.trainings[trainingPosition - 1].sets[position - 1][repsOrDuration[0]]);
    console.log(...plan.trainings[trainingPosition - 1].sets);
    updatePlan({ ...plan });
  }

  const implementNewValue = (what, newValue) => {

    // plan.trainings[trainingPosition - 1].sets[position - 1][repsOrDuration[0]]  = newValue;
    plan.trainings[trainingPosition - 1].sets[position - 1][what] = newValue;
    // console.log(...plan.trainings[trainingPosition - 1].sets);
    updatePlan({ ...plan });
  }


  ////interlink reps and %
  let updatePercentagesValue = (newValue) => {
    plan.trainings[trainingPosition - 1].sets[position - 1].repsAsPercentage = newValue;
    // plan.trainings[trainingPosition - 1].sets[position - 1].reps = Math.round(newValue / 100 * plan.maxRepsNeeded.reps);
    updatePlan({ ...plan });
  }

  let updateRepsAsPartOfPercentagesValue = (newValue) => {
    // plan.trainings[trainingPosition - 1].sets[position - 1].reps = newValue;
    plan.trainings[trainingPosition - 1].sets[position - 1].repsAsPercentage = Math.round(newValue / plan.maxRepsNeeded.reps * 100);
    updatePlan({ ...plan });
  }




  return (

    <Card style={{ backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }}>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={position}
        // className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
        className="p-1 bg-none MMpointer  text-center btnOpacity"
        style={{
          background: 'orange',
          margin: '0px 20px 0px 20px',
          borderRadius: '10px 10px 0 0',
          borderBottom: '1px dotted #00000078', //black semi-see-through
          // borderRadius: '10px',
          // border: 'none'

        }}
        // ref={thisSetRef}
        id={`Training${trainingPosition}Set${position}ID`}
        // onClick={() => positionElementToTheTop(thisSetRef.current, 350)}
        onClick={() => positionElementToTheTop(document.getElementById(`Training${trainingPosition}Set${position}ID`), 350)}
      // onClick={togglePublicPlansView}

      >
        <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '5px' }}>
          {/* <h5 style={{ textAlign: 'center', flex: 'auto' }}>Set {position}  🔽</h5> */}
          <h5 style={{ margin: '0', padding: '0', textAlign: 'center', width: '50%' }}>Set {position}  🔽</h5>
          <span style={{ color: 'black', fontSize: '12px', flex: 'none', width: '25%' }}>{(reps ||reps===0)  ? reps : (repsAsPercentage + '% ('+repsCalculatedFromMaxAndPercentage+')')}reps</span>
          <span style={{ color: 'gray', fontSize: '12px', flex: 'none', width: '25%' }}>{breakAfterInSeconds} s.</span>
        </div>
        {/* <p style={{ color: 'gray', fontSize: '13px' }}>(Organize on which day to do which training.)</p> */}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={position}>
        <SCard style={{ overflowY: 'auto', backgroundColor: 'orange', padding: '1rem 0.5rem 1rem 0.5rem' }}>

          <SSet>
            <div >
              {/* <h5 style={{ display: 'inline' }}> Set {position}</h5> */}
              {/* <div style={{ display: 'inline-flex',width:'50%', justifyContent: 'flex-end', opacity: '0.6' }}> */}

            </div>
            <SSection>
              <div>
                {!plan.repsAsPercentages &&
                  <div>
                    <p style={{ textAlign: 'center' }}>{reps !== undefined ? 'Reps' : 'Duration'}</p>
                    <div style={{ textAlign: 'center' }}>
                      {/* <SCounterSmall onClick={() => adjust(-1, repsOrDuration[0])}>
                  <img src={imgMinus} alt=""></img>
                  <div >1</div>
                </SCounterSmall> */}
                      {/* <SCounter onClick={() => adjust(-5, repsOrDuration[0])}><img src={imgMinus} alt=""></img> <div >5</div></SCounter>
                <input onChange={updateRepsOrDuration} type='number' value={reps !== undefined ? reps : duration}></input>
                <SCounter onClick={() => adjust(5, repsOrDuration[0])}><img src={imgPlus} alt=""></img> <div >5</div></SCounter>
                <SCounterSmall onClick={() => adjust(1, repsOrDuration[0])}><img src={imgPlus} alt=""></img> <div >1</div></SCounterSmall> */}
                      {/* {reps == undefined && <p style={{ marginTop: '-20px', fontSize: '0.85rem' }}>seconds</p>} */}

                      <CounterAllIn settings={[1, 5, (v) => implementNewValue('reps', v), reps, '', '',0]} />

                    </div>
                  </div>}



                {plan.repsAsPercentages &&
                  <div style={{ textAlign: 'center' }}>
                    <CounterAllIn settings={[1, 5, updatePercentagesValue, repsAsPercentage, '%', 'of Max Reps',0]} />
                    {/* <p style={{ textAlign: 'center' }}>makes... </p> */}
                    <p style={{ textAlign: 'center' }}>= </p>
                    <CounterAllIn settings={[1, 5, updateRepsAsPartOfPercentagesValue, repsCalculatedFromMaxAndPercentage, '','reps',0]} />
                  </div>}

              </div>
              <SNote>
                <p>Notes (Specify type of pushups, etc):</p>
                <textarea onChange={updateRepOrDurationNotes} value={repsNotes} />
              </SNote>
              <button style={{ display: 'none' }} onClick={toggleRepsDuration}>
                {reps !== undefined ? 'Replace "Reps" with "Duration"' : 'Replace "Duration" with "Reps"'}
              </button>


            </SSection>


            <SSection>
              <div>
                <p style={{ textAlign: 'center' }}>Break</p>
                <div style={{ textAlign: 'center' }}>
                  {/* <SCounterSmall howMuch='-1' onClick={() => adjust(-5, 'breakAfterInSeconds')}><img src={imgMinus} alt=""></img><div >5</div></SCounterSmall>
            <SCounter onClick={() => adjust(-30, 'breakAfterInSeconds')}><img src={imgMinus} alt=""></img><div >30</div></SCounter>
            <input onChange={adjustBreakTime} type='number' value={breakAfterInSeconds}></input>
            <SCounter onClick={() => adjust(30, 'breakAfterInSeconds')}><img src={imgPlus} alt=""></img><div >30</div></SCounter>
            <SCounterSmall onClick={() => adjust(5, 'breakAfterInSeconds')}><img src={imgPlus} alt=""></img><div >5</div></SCounterSmall>
            <p style={{ marginTop: '-20px', fontSize: '0.85rem' }}>seconds</p> */}

                  <CounterAllIn settings={[5, 30, (v) => implementNewValue('breakAfterInSeconds', v), breakAfterInSeconds, '', 'seconds', 0]} />
                </div>
              </div>

              <SNote>
                <p>Notes (What to do during break?):</p>
                <textarea onChange={adjustBreakNotes} value={breakNotes}></textarea>
              </SNote>
            </SSection>
            {/* <div style={{ float: 'right', opacity: '0.6', marginTop: '-10px' }}> */}
            <div className='adjustPlanDuplicateDeleteSetOrTrainingButtonsWrapper'>
              <button className='adjustPlanDuplicateDeleteSetOrTrainingButton' onClick={duplicateSet}>Duplicate <br /> this set</button>
              <button className='adjustPlanDuplicateDeleteSetOrTrainingButton' onClick={deleteSet}>Delete <br /> this set</button>
            </div>


          </SSet>

        </SCard>
      </Accordion.Collapse>
    </Card>

  );
};

export default Set;