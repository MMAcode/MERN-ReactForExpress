import React from 'react';
import Trainings from './Trainings';
import styled from 'styled-components';
import { createPersonalTRAININGStarter } from './cratingObjectsfunctions';
import PlanContext from './ContextDefaults';
import Schedule from './schedule/Schedule';
import { SLink } from '../Home';
import { withRouter } from 'react-router-dom';

import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData'
import PushUpsContext from '../state/PushUpsContextState';
import PercentagesRegimeActivator from './PercentagesRegimeActivator';
// import TextEditorReactQuill from './richTextEditing/TextEditorReactQuill';
import TextEditorReactQuill from '../basicComponents/richTextEditing/TextEditorReactQuill';

import { Accordion, Card } from 'react-bootstrap';
import positionElementToTheTop from '../functions/styling/positionElementToTheTop';


const SPlan = styled.div`
background-color: brown;
padding:3%;
`;

const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
/* background-color: rgba(233, 154, 7, 0.62); */
background-color: transparent;
margin: 0;
`

// const ShowPersonalPlanToUserToAdjust = ({ planToAdjust, plantToAdjust:{name, trainings} }) => {
const ShowPersonalPlanToUserToAdjust = ({ planToAdjust, history, adjustingNotCreating, publicPlan }) => {
  // console.log("adjustingNotCreating: ", adjustingNotCreating);

  const planAdjustTrainingRef = React.useRef(null);
  const planAdjustScheduleRef = React.useRef(null);
  const planAdjustPublicRef = React.useRef(null);

  React.useEffect(() => {
    // (async () => { await new Promise(resolve => setTimeout(resolve, 350)); })()
    //scroll should be within this async anyway to be delayed
    window.scrollTo(0, 0);
  }, []);



  console.log("publicPlan???:", publicPlan);
  // let { name, trainings, schedule } = planToAdjust;
  let pushupContext = React.useContext(PushUpsContext);

  const planWMethods = {
    ...planToAdjust,
    newTraining(repsAsPercentages, maxReps) {
      this.trainings.push(createPersonalTRAININGStarter(undefined, repsAsPercentages, maxReps));
      return this;
    }
  }
  const [plan, updatePlan] = React.useState(planWMethods);
  const [thisNameExistsAlready, setThisNameExistsAlready] = React.useState(false);
  const planPackage = { plan, updatePlan };


  //tools to deal with checking for unique name
  const [name, setName] = React.useState(plan.name);
  const [richDescription, setRichDescription] = React.useState(plan.descriptionRich ? plan.descriptionRich : plan.description);
  const [summary, setSummary] = React.useState(plan.summary ? plan.summary : null);
  // const [richDescription, setRichDescription] = React.useState(plan.descriptionRich);
  const [publicPlansNames, setPublicPlansNames] = React.useState(null);
  let publicPlans = pushupContext.publicPlans;
  // console.log("publicPlans: ", publicPlans);
  // console.log("pushupContext: ", pushupContext);

  React.useEffect(() => {
    if (publicPlans) {
      let publicPlansNamesSupportVar = publicPlans.map(publicPlan => publicPlan.name);
      setPublicPlansNames(publicPlansNamesSupportVar);
      // console.log("publicPlansNames: ", publicPlansNames);
    }
  }, [publicPlans]);


  const [submitted, setSubmitted] = React.useState(false);
  React.useEffect(() => {
    if (adjustingNotCreating === undefined) { //undefined==plan is created, doesn't have position
      document.querySelector('#planNameInputHere').focus();
    }
  }, []);


  // console.log("PLAN to update:", plan);

  React.useEffect(() => {
    //search through all public names. if this one exists within
    if (publicPlansNames) {//=once names were loaded from context...
      let thisNameExistsAlreadySupportVar = publicPlansNames.find(nameInDb => name === nameInDb);
      setThisNameExistsAlready(thisNameExistsAlreadySupportVar);
    }
  }, [name, publicPlansNames]);

  const updatePlanName = ({ target: { value } }) => {
    // to deal with names in DB
    setName(value);

    plan.name = value;
    updatePlan({ ...plan });
    // pushupContext.user.p
    // pushupContext.updateUser(pushupContext.user);
  }


  const updateSummaryValue = (updatedSummary) => {
    // console.log("updating plan")
    plan.summary = updatedSummary;
    updatePlan({ ...plan });
  }

  // const updatePlanDescription = ({ target: { value } }) => {
  //   // console.log(value);
  //   plan.description = value;
  //   updatePlan({ ...plan });
  // }
  const saveRichDescriptionToDB = async (updatedDescription) => {
    if (adjustingNotCreating) {
      //assuming this is adjustable personal plan on db side...
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/updatePlanDescriptionRich', { positionFrom0: adjustingNotCreating, updatedDescription, publicPlan });
      pushupContext.updateUser({ ...updatedUser });
    } else {
      plan.descriptionRich = updatedDescription;
      updatePlan({ ...plan });
    }
  }
  const updateRichDescriptionValue = (updatedDescription) => {
    console.log("updating plan")
    plan.descriptionRich = updatedDescription;
    updatePlan({ ...plan });
  }



  const handleFormSubmit = async () => {
    try {
      // plan.s chedule = plan.s chedule.map(day => day > 0 ? day : 0);
      // console.log("plan with cleaned schedule", plan);

      //change notes  first letters to upper cases:


      let updatedUser;
      if (adjustingNotCreating >= 0) {
        updatedUser = await postJsonDataUrlAfterAPIpushups('/saveChangesInPersonalPlanContent', { plan, positionFrom0: adjustingNotCreating, publicPlan });
        // console.log("updated planXX:", updatedUser);

      } else {
        updatedUser = await postJsonDataUrlAfterAPIpushups('/addPersonalPlan', { newPlan: plan });
      }

      pushupContext.updateUser(updatedUser);
      setSubmitted(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      history.push('/pushups/trainingPlans/personal');
      setSubmitted(false);


    } catch (err) { console.log(err) }
  }

  const [state1, setState1] = React.useState({ b: 'default useContext', counter: 0 })
  // console.log("state1=context now:", state1);

  React.useEffect(() => {
    console.log("^plan updated to: ", plan);
    // console.log("^set-data now: ",plan.trainings[0].sets[0].reps,plan.trainings[0].sets[0].repsAsPercentage+'%', plan.trainings[0].sets)
  }, [plan])

  let customStylesHere = {
    minHeight: '200px',
    border: '1px gray solid !important',
    borderRadius: '0.5em',
    // backgroundColor: '#fefcfc'
    backgroundColor: '#fff3d0'
  }

  return (
    <SPlan>
      <PlanContext.Provider value={planPackage}>


        {submitted ? <h1 style={{ backgroundColor: 'green', textAlign: 'center', color: 'white', padding: '20px' }}>Submitted. Great Work!</h1>
          : <SLink
            as='button'
            style={{ display: 'block', width: '100%', margin: '10px auto', textAlign: 'center' }}
            type="submit"
            onClick={handleFormSubmit}>
            Save {adjustingNotCreating >= 0 ? 'Changes' : 'Plan'}
          </SLink>}
        {/* <form id='personalPlanForm'> */}
        <h3>1) Plan name: <input id='planNameInputHere' type='text' onChange={updatePlanName} placeholder='mandatory field' value={plan.name} style={{ backgroundColor: `${thisNameExistsAlready ? "red" : "white"}`, maxWidth: '90vw' }}></input></h3>
        {/* <p style={{ textAlign:'center', color:'lightGray', fontSize: `${thisNameExistsAlready ? "1.3rem" : "13px"}` }}>This name CAN{thisNameExistsAlready && "'T"} be used for public plan{thisNameExistsAlready && ", as other public plan has this name already"}.</p> */}
        <p style={{ textAlign: 'center', color: 'lightGray', fontSize: `${thisNameExistsAlready ? "1.3rem" : "13px"}` }}>{thisNameExistsAlready && "This name CAN'T be used for public plan, as other public plan has this name already. (You can still use this name for your personal plan.)"}</p>
        {/* <Trainings trainings={trainings} /> */}






        {/* <button type="submit" onClick={handleFormSubmit}>Save Plan</button> */}


        {/* extra settings to publish the plan */}
        <Accordion
          className='p-1'
          style={{ background: 'transparent', margin: '10px -4%' }}
        // defaultActiveKey='0'
        // defaultActiveKey='10'
        // defaultActiveKey={user ? (user.settings ? '1' : '0') : '0'}
        // defaultActiveKey={viewController ? (viewController.public.view ? '1' : '0') : '1'}
        >
          {/* <Card style={{background:'transparent', border:'none'}} > */}

          <Card style={{ backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }}>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="10"
              // className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
              className="p-1 bg-none MMpointer  text-center btnOpacity"
              style={{
                background: 'white',
                margin: '0px 20px 0px 20px',
                // borderRadius:'10px 10px 0 0'
                // borderRadius: '10px',
                // border: 'none',
                borderRadius: '10px 10px 0 0',
                borderBottom: ' 1px dotted #00000078', //black semi-see-through
                // borderStyle:'groove'
              }}
              // onClick={togglePublicPlansView}
              ref={planAdjustTrainingRef}
              onClick={() => positionElementToTheTop(planAdjustTrainingRef.current, 350)}
            >
              <h4>2) Trainings 🔽</h4>
              <p style={{ color: 'gray', fontSize: '13px' }}>(Create 1 or more trainings.)</p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="10">
              <SCard style={{ overflowY: 'auto', backgroundColor: 'white', padding: '1rem 0.5rem 1rem 0.5rem' }}>
                <Trainings trainings={plan.trainings} />
              </SCard>
            </Accordion.Collapse>
          </Card>

          {/* schedule: */}
          <Card style={{ backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }}>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="20"
              // className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
              className="p-1 bg-none MMpointer  text-center btnOpacity"
              style={{
                background: 'white',
                margin: '0px 20px 0px 20px',
                // borderRadius:'10px 10px 0 0'
                // borderRadius: '10px',
                borderRadius: '10px 10px 0 0',
                borderBottom: ' 1px dotted #00000078', //black semi-see-through
              }}
              ref={planAdjustScheduleRef}
              onClick={() => positionElementToTheTop(planAdjustScheduleRef.current, 350)}
            // onClick={togglePublicPlansView}


            >
              <h4>3) Schedule 🔽</h4>
              <p style={{ color: 'gray', fontSize: '13px' }}>(Organize on which day to do which training.)</p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="20">
              <SCard style={{ overflowY: 'auto', backgroundColor: 'white', padding: '1rem 0.5rem 1rem 0.5rem' }}>
                <Schedule />
              </SCard>
            </Accordion.Collapse>
          </Card>

          {/* adtional for publishing: */}
          <Card style={{ backgroundColor: 'transparent', border: 'none', marginTop: '20px' }}>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="30"
              // className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
              className="p-1 bg-none MMpointer  text-center btnOpacity"
              style={{
                background: 'lightGray',
                margin: '0px 60px 0px 60px',
                // borderRadius:'10px 10px 0 0'
                borderRadius: '10px 10px 0 0',
                borderBottom: ' 1px dotted #00000078', //black semi-see-through
              }}
              ref={planAdjustPublicRef}
              onClick={() => positionElementToTheTop(planAdjustPublicRef.current, 350)}
            // onClick={togglePublicPlansView}
            >
              <p>4) Extra settings to publish the plan 🔽</p>
              <p style={{ color: 'gray', fontSize: '10px' }}>(Summary, Description,Target Group,...)</p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="30">
              <SCard style={{ overflowY: 'auto', backgroundColor: 'lightGray', padding: '1rem 0.5rem 1rem 0.5rem' }}>
                <h4 style={{ display: 'inline' }}>Summary:</h4>
                <span>(max 150 characters)   </span>
                <TextEditorReactQuill
                  placeholder={"Write here... (Plan without summary can't be published.)"}
                  initialValue={summary}
                  onChange={updateSummaryValue}
                  customStyles={customStylesHere}
                />
                <h4>Detailed Description: </h4>
                {/* <textarea style={{ width: '100%', height: '100px' }} type='text' onChange={updatePlanDescription} value={plan.description} placeholder='Mandatory field for public plans. (Write description if you intent to make this plan public.)'></textarea> */}
                {adjustingNotCreating ? <TextEditorReactQuill placeholder={"Write here... (Plan without description can't be published.)"} initialValue={richDescription} onChange={updateRichDescriptionValue} onSubmit={saveRichDescriptionToDB} customStyles={customStylesHere} submitButtonText='Save description' />
                  : <TextEditorReactQuill
                    placeholder={"Write here... (Plan without description can't be published.)"}
                    initialValue={richDescription}
                    onChange={updateRichDescriptionValue}
                    customStyles={customStylesHere}
                  />}

                <PercentagesRegimeActivator user={pushupContext.user} />

              </SCard>
            </Accordion.Collapse>
          </Card>
        </Accordion>



        {submitted ? <h1 style={{ backgroundColor: 'green', textAlign: 'center', color: 'white', padding: '20px' }}>Submitted. Great Work!</h1>
          : <SLink
            as='button'
            style={{ display: 'block', width: '100%', margin: '10px auto', textAlign: 'center' }}
            type="submit"
            onClick={handleFormSubmit}>
            Save {adjustingNotCreating >= 0 ? 'Changes' : 'Plan'}
          </SLink>}
        {/* <button onClick={handleTest}>Plan test</button> */}
        {/* </form> */}
      </PlanContext.Provider>
    </SPlan>
  );
};

export default withRouter(ShowPersonalPlanToUserToAdjust);