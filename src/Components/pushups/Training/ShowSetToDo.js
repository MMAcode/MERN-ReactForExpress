import React from 'react';
import styled from 'styled-components';
import { TrainingContext } from './RunTraining';
import PaceMaker from '../assessment/PaceMaker';
import AccordionMiro from '../basicComponents/AccordionMiro';
import AssessmentForm from '../assessment/AssessmentForm';
import { IconAndTextInColumn } from '../basicComponents/IconAndText';
import { ReactComponent as IconMetronom } from '../../../images/icons/metronom.svg';
import { ReactComponent as IconTest } from '../../../images/icons/result.svg';


const SScreen = styled.div`
background-color: yellow;
`
const SButton = styled.button`
width:30%;
padding:3%;
margin:2%;

height:100px;
font-size:2rem;
/* border-radius: 20px 10px 20px 0; */
border-radius: 10px;
/* border-bottom-right-radius: 20px; */
`
const SButton2 = styled(SButton)`
width:60%;
`


const ShowSetToDo = () => {

  let trainingContext = React.useContext(TrainingContext);
  let [trainingState, setTrainingState] = trainingContext;
  let isLastSet = trainingState.main.setNumberFrom1 >= trainingState.main.training.sets.length ? true : false;

  let set = trainingState.main.set;
  console.log("trainingState SET", trainingState);
  // console.log("CURRNET SET running")
  // console.log("set info", set)

  // const startBreakLogData = () => {
  //   setTrainingState({ red: !trainingState.red });
  //   setTrainingState({ stage: 2 });
  // }

  let openCardHandler = React.useState('0');
  // let test = React.useState('0');
  // let cake;
  const closeAccordion = () => {
    console.log("submitted");
    // console.log("object")
    openCardHandler[1]('0');
    // openCardHandler = [...openCardHandler];
    // cake = 3;
    // test[1]('8');
  }
  // React.useEffect(() => { console.log("MAIN-openCardHandler: ", openCardHandler) }, [openCardHandler])

  return (
    <SScreen>
      <h1>SET To Do</h1>
      {isLastSet && <h2>This is your last set.</h2>}

      {/* <AccordionMiro cardOpenHandler={[openCardHandler[0],openCardHandler[1]]}> */}
      <AccordionMiro cardOpenHandler={openCardHandler}>
        {/* <p>Metronom 🔽</p> */}
        <IconAndTextInColumn>
          <IconMetronom />
          <span>Metronom </span>
          {/* <p>Update max reps</p> */}

        </IconAndTextInColumn>
        <div>
          <PaceMaker />
          <AccordionMiro bg='rgb(185 157 20)' titleHeight='auto'>
            <IconAndTextInColumn>
              <IconTest />
              <span>Save assessment </span>
              {/* <p>Update max reps</p> */}

            </IconAndTextInColumn>
            <AssessmentForm loadHomePage={false} onSubmitFunction={closeAccordion} />
          </AccordionMiro>
        </div>
      </AccordionMiro>


      {/* <p style={{fontSize:'4rem', textAlign:'center', marginBottom:'-2rem', fontWeight:'bold'}}>{set.reps ? set.reps : set.duration}</p> */}
      <p style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '-2rem', fontWeight: 'bold' }}>{set.reps}</p>
      <p style={{ fontSize: '2rem', textAlign: 'center', marginTop: '0' }}>reps</p>
      {/* <p style={{fontSize:'2rem', textAlign:'center',marginTop:'0'}}>{set.reps ? 'reps' : 'seconds'}</p> */}
      {set.repsNotes &&
        <p> Exercise Notes: {set.repsNotes}</p>}
      {/* <button onClick={startBreakLogData}>Start Break (+ Log data)</button> */}

      {!isLastSet && <h3 style={{ textAlign: 'center' }}>Start break and...</h3>}
      <SButton onClick={() => { setTrainingState({ ...trainingState, stage: 2 }) }}>
        Adjust
      </SButton>
      <SButton2 onClick={() => { setTrainingState({ ...trainingState, stage: 2.5 }) }}>
        Save
      </SButton2>
      <h3 style={{ textAlign: 'center' }}>...data</h3>
      <div>
        {/* <PaceMaker/> */}

      </div>
    </SScreen>
  );
};

export default ShowSetToDo;