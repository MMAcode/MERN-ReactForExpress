import React from 'react';
// import { useForm } from "react-hook-form";
// import { Slider, Typography } from '@material-ui/core';


// import useSlider from './planEvaluation/useSliderBallVisibility';
import BetterSlider from './planEvaluation/BetterSlider';
import FormTextMiro from './planEvaluation/FormTextMiro';
import { postJsonDataUrlAfterAPIpushups } from '../../functions/postJsonData';
import PushUpsContext from './state/PushUpsContextState';
import BetterRadio from './planEvaluation/BetterRadio';
import data from './planEvaluation/questionsData'
import Modal from './basicComponents/ModalWTransition'
import BetterToggle from './basicComponents/BetterToggle'
import { withRouter } from 'react-router-dom';




const PlanEvaluation = ({ history }) => {
  let { user, updateUser, publicPlans, updatePublicPlans } = React.useContext(PushUpsContext);

  let [ thisIsDeveloperChange, thisIsDeveloperChangeSet ] = React.useState(undefined);
  React.useEffect(() => {
    //if this is developer's change...
    if (user?.pushupPlans?.current?.evaluation?.publicPlanID) {
      thisIsDeveloperChangeSet(user.pushupPlans.current.evaluation);
      console.log("THIS IS DEVELOPER CHANGE: ", user.pushupPlans.current.evaluation);

      //set executed plan info..
      setExecutedPlan({ id: user.pushupPlans.current.evaluation.planExecutionID, positionFrom0: '', name: '' });

    };



    //if form finished...
    // if (!user?.pushupPlans?.current) history.push('/pushups');
    if (user && !user.pushupPlans.current) setRenderXY('finished');
    if (user?.pushupPlans?.current?.evaluation?.state === 'finished') {
      //this will work only for a split of a second if at all as currnet plan will be removed on db
      setRenderXY('finished');
    }

  }, [user]);

  let formHere = data.formHere;

  const [formData, setFormData] = React.useState(formHere);
  let form = [formData, setFormData];

  // developer updating public plan info 
  let [dPlan, setDPlan] = React.useState({ id: '', name: '' });
  React.useEffect(() => {
    if (publicPlans) {
      let plan = publicPlans.find(p => p.name === dPlan.name);
      // if(plan) setDPlan(p => ({ ...p, id: (plan ? plan._id : 'not found') }))
      if (plan && !dPlan.id) {
        setDPlan(p => ({ ...p, id: plan._id }));
        // setFormData(origValue => ({ ...origValue, __publicPlanId: plan._id }));
      }
      if (plan && plan._id) setFormData(origValue => ({ ...origValue, __publicPlanId: plan._id }));

    };
  }, [dPlan, publicPlans])
  React.useEffect(() => {
    console.log("PUBLIC PLAN NOW: ", dPlan);
  }, [dPlan])

  


  let [executedPlan, setExecutedPlan] = React.useState({ positionFrom0: '', id: '', name: '' });
  React.useEffect(() => {
    console.log("EXECUTED PLAN data now: ", executedPlan);
    if (user) {
      // let plan = user.pushupPlans.history[indexNeeded];



      //get specific plan execution data
      let plan; let index;
      if (executedPlan.positionFrom0) plan = user.pushupPlans.history[executedPlan.positionFrom0];



      //find plan execution data in user's history
      if (executedPlan.id) plan = user.pushupPlans.history.find((pl, i) => {
        if (pl._id === executedPlan.id) {
          index = i;
          return true;
        }
      });


      if (plan && !executedPlan.name) {
        setExecutedPlan(p => ({ ...p, name: plan.name, id: plan._id, positionFrom0: index ? index : p.positionFrom0 }))
      }

      // setFormData(f => ({ ...f, __executedPlanIdDEVELOPER: executedPlan.id ? executedPlan.id : undefined }))
      if (executedPlan.id && !formData.__executedPlanIdDEVELOPER) {
        setFormData(f => ({ ...f, __executedPlanIdDEVELOPER: executedPlan.id}))
      }
    };
  }, [executedPlan,formData])



  // developer updating public plans -End




  // console.log("FORM NOW:", form);
  // const [formData, setFormData] = React.useState(user.pushupPlans.current?.evaluation ? user.pushupPlans.current?.evaluation : formHere);


  const [renderXY, setRenderXY] = React.useState(null);
  React.useEffect(() => {
    // console.log(formData);


    ////GET EXISTING EVALUATION IF IT EXISTS
    //wait until user and public plans exists...
    if (user?.pushupPlans?.current?.evaluation && publicPlans) {
      // const evaluationInfoOnUser = user.pushupPlans.current.evaluation;

      //get existing evaluation data...
      if (user.pushupPlans.current.evaluation.state === 'started') {
        console.log("This evaluation was started before. Getting existing data...")
        let publicPlanIdHere = thisIsDeveloperChange ? thisIsDeveloperChange.publicPlanID : user.pushupPlans.current.planIDType;

        let publicPlan = publicPlans.find(plan => plan._id === publicPlanIdHere);
        //if developer is adjusting another plan
        if (thisIsDeveloperChange) setDPlan({ id: publicPlan._id, name: publicPlan.name });
        // console.log("PUBLIC PLAN TO EVALUATE: ", publicPlan);
        // let evaluation = publicPlan.executions.evaluations.find(evl => evl._id === ev.evaluationID);
        // let evaluation = publicPlan.executions.completed.find(execution => execution.evaluation?._id === ev.evaluationID);


        // let publicPlanExecutionWanted = publicPlan.executions.completed.find(execution => execution.usersPlanExecutionID === evaluationInfoOnUser.evaluationID);
        // if (user?.pushupPlans?.current?.evaluation?.planExecutionID) {
        //   publicPlanExecutionWanted = publicPlan.executions.completed.find(execution => execution.usersPlanExecutionID === user?.pushupPlans?.current?.evaluation?.planExecutionID);
        // }
        // let evaluation = publicPlanExecutionWanted.evaluation;
        // console.log("EVALUATION TO CONTINUE FOUND: ", evaluation);
        // if (evaluation) setFormData(evaluation);

        let planExecutionIDHere = thisIsDeveloperChange ? thisIsDeveloperChange.planExecutionID : user.pushupPlans.current._id;
        console.log("IDIDIDIDIDIDIDIplanExecutionIDHere: ", planExecutionIDHere);
        let execution = publicPlan.executions.completed.find(execution => execution.usersPlanExecutionID === planExecutionIDHere);
        if (execution?.evaluation) {
          setFormData(execution.evaluation);
          console.log("data from existing evaluation on db:", execution.evaluation);
        }
  
      }
      // setFormData(user.pushupPlans.current.evaluation);
    }
  }, [user, publicPlans,thisIsDeveloperChange])


  let [bestWorst, setBestWorst] = React.useState('best');
  React.useEffect(() => {
    console.log("formData now:", formData);
    if (formData.updateDB) {
      updateDB();
      setFormData(d => ({ ...d, updateDB: false }));
    }

    //update bestWorst if needed
    if (formData.satisfaction >= 50 && bestWorst != 'best') setBestWorst('best');
    if (formData.satisfaction < 50 && formData.satisfaction != null && bestWorst != 'worst') setBestWorst('worst');
  }, [formData])

  const [changesWhenSavedToDb, setChangeWhenSavedToDb] = React.useState(0);
  const updateDB = async () => {
    console.log("formDate for DB ", formData);
    // if (formData.restBeforeAssessment === 0) formData.restBeforeAssessment = false;
    // if (formData.restBeforeAssessment === 1) formData.restBeforeAssessment = true;

    const [updatedUser, updatedPublicPlan] = await postJsonDataUrlAfterAPIpushups('/updateUserPlanEvaluation', { fromFrontEnd: { formData } });
    // console.log(" eval - USER from DB:", updatedUser.pushupPlans.current);
    updateUser({ ...updatedUser });

    // updatePublicPlans(pps => {
    // console.log("UPDATED PLANS1:", pps);
    // console.log("UPDATED PLANS2:");

    let index;
    // pps.find((pp, i) => {
    //   if (pp._id === updatedPublicPlan._id) index = i;
    // })
    publicPlans.find((pp, i) => {
      if (pp._id === updatedPublicPlan._id) index = i;
    })
    // console.log("IIIIIIIIINDEX:", index);
    publicPlans.splice(index, 1, updatedPublicPlan);
    updatePublicPlans([...publicPlans]);
    // console.log("UPDATED PLANS:", pps);
    // return pps;
    // })
    setChangeWhenSavedToDb(x => x + 1);
  }

  const finishEvaluationButtonClicked = () => {
    console.log("Finishing");
    if (dPlan.id) { //if developer is updating another plan...
      console.log("AAAAAAAAAAAAAAAAAAAttaching public ID");
      setFormData(origValue => ({ ...origValue, _evaluationFinished: 'finished', updateDB: true, __publicPlanId: dPlan.id }));
    }
    else {
      setFormData(origValue => ({ ...origValue, _evaluationFinished: 'finished', updateDB: true }));
    }
    // alert('Evaluation Finished. Thank you.');
  }



  if (renderXY === 'finished') {
    return (<Modal title='Plan Evaluation' closeWithButton startOpen buttonAction={() => history.push('/pushups')}>
      <p>Thank yoy. Evaluation was finished.</p>
    </Modal>)
  }

  return (
    <div style={{ padding: '0 10px' }}>
      <h2 style={{ textAlign: 'center' }}>Plan Evaluation</h2>
      {!user?.pushupPlans?.current?.evaluation?.state &&
        <Modal title='Plan Evaluation' closeWithButton startOpen>
          <p style={{ fontWeight: 'bold' }}>Please answer upcoming questions so that future users can benefit from your experience.</p>
          <br />
          <p>You don't need to answer all/any questions. Please answer as much as you can.</p>
          <br />
          <p>All your answers will be public so please, keep that in mind.</p>
          <br />
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>(Last question will give you the option to only publish your answers anonymously, meaning not publishing your nick-name together with your answers.)</p>
          {/* <p style={{fontSize:'0.8rem'}}>(You will be able also to show/hide specific answers according to your preferences.)</p> */}

        </Modal>}

      <BetterSlider setting={['Difficulty', data.questionD, data.marksDifficulty, form, 'difficulty', updateDB]} />
      <BetterSlider setting={['Satisfaction', data.questionS, data.marksSatisfaction, form, 'satisfaction', updateDB]} />
      <BetterSlider setting={['Recommendation', data.questionR, data.marksRecommendation, form, 'recommendation', updateDB]} />

      {/* doesn't evaluate this specific plan */}
      <BetterSlider setting={['Future', data.questionFuture, data.marksFuture, form, 'future', updateDB]} />
      {formData?.future >= 50 && <BetterSlider setting={['FutureSchedule', data.questionFutureSchedule, data.marksFutureSchedule, form, 'futureSchedule', updateDB, { max: 30, labelDisplay: 'on', labelWidth: '200px' }]} />}

      {/* <p style={{ textAlign: 'center', color: 'gray' }}> - Short-term factors - </p> */}

      <BetterSlider setting={['Sports/Physical activities 1', data.questionOtherSportsScale, data.marksOtherSportsScale, form, 'otherSportsScale', updateDB, { max: 20, step: 0.5, labelDisplay: 'on', labelWidth: '200px' }]} />
      <BetterSlider setting={['Sports/Physical activities 2', data.questionOurMuscles, data.marksOurMuscles, form, 'ourMuscles', updateDB, { max: 10, labelDisplay: 'on', labelWidth: '200px', dropValueLabelExtraTextAfter: 'x' }]} />
      <FormTextMiro setting={['Sports/Physical activities 3',
        "What other types of sport/physical activities did you do in last 2 weeks? How often? How long?",
        form, 'otherSports', updateDB, changesWhenSavedToDb]} >
        <div style={{ color: 'gray', fontSize: '0.8rem' }}>
          <p>Example 1: "I trained 3x/week in the gym each week, all body parts."</p>
          <p>Example 2: "I played football 5x a week, dancing once a week for 1 hour, cycling on last Saturday for 4 hours.")',</p>
        </div>
      </FormTextMiro>

      <BetterSlider setting={['Rest', data.questionRest, data.marksRest, form, 'restBeforeAssessment', updateDB, { max: 2, labelDisplay: 'off' }]} />
      <BetterSlider setting={['Warm-Up', data.questionWarmUp, data.marksWarmUp, form, 'warmUoBeforeAssessment', updateDB, { max: 4 }]} />
      <BetterSlider setting={['Health issues', data.questionHealth, data.marksHealth, form, 'healthIssues', updateDB]} />
      <BetterSlider setting={['Lifestyle - At Work', data.questionWork, data.marksWork, form, 'lifestyleAtWork', updateDB]} />
      <BetterSlider setting={['Lifestyle - Free-time', data.questionFreeTime, data.marksFreeTime, form, 'lifestyleFreeTime', updateDB]} />

      {/* <p style={{ textAlign: 'center', color: 'gray' }}> - Long-term factors - </p> */}


      <BetterRadio setting={['Gender', 'What is your gender?', data.genderLabels, form, 'gender']} />
      <BetterSlider setting={['Age', data.questionAge, data.marksAge, form, 'age', updateDB, { labelDisplay: 'on' }]} />
      <BetterSlider setting={['Cheating', data.questionCheating, data.marksCheating, form, 'cheating', updateDB]} />

      <FormTextMiro setting={[`1-3 ${bestWorst} things`,
      `Please describe 1-3 ${bestWorst} things about this plan.`,
        form, `writing${(bestWorst.charAt(0).toUpperCase() + bestWorst.slice(1))}`, updateDB, changesWhenSavedToDb]} >
      </FormTextMiro>
      <FormTextMiro setting={['Progress',
        `In your opinion, what could be the main REASONS for (lack of) your PROGRESS?`,
        form, `writingReasons`, updateDB, changesWhenSavedToDb]} >
      </FormTextMiro>
      <FormTextMiro setting={['1 Advice',
        `What one thing would you wish/recommend to improve on this app?`,
        form, `writingOneThing`, updateDB, changesWhenSavedToDb]} >
      </FormTextMiro>
      <FormTextMiro setting={['Comments',
        `Is there anything else, you would like to say?`,
        form, `writingComments`, updateDB, changesWhenSavedToDb]} >
      </FormTextMiro>
      {/* <BetterToggle label={['Publish my results anonymously']} fv={handlePuclicityToggleValue}  ></BetterToggle> */}
      <BetterToggle label={['Publish my results anonymously']} formAndField={[form, '_publishAnonymously']}  ></BetterToggle>
      <p style={{ textAlign: 'center', color: 'gray', }}>Please don't publish your answers anonymously so that your friends can see, what was your experience.</p>
      <br />


      <button onClick={finishEvaluationButtonClicked} style={{ display: 'block', margin: 'auto auto 20px auto' }}>Finish Plan Evaluation</button>

      {user?.authority?.power > 99 && <div>
        <br />
        <h3 style={{ color: 'gray' }}>Developer's playground</h3>
        <h4>These data has to be entered FIRST!!</h4>
        <span>public Plan name:</span><input value={dPlan.name} onChange={({ target: { value } }) => setDPlan({ name: value, id: '' })}></input>
        <p>plan ID: {dPlan.id}</p>
        <p>plan name: {dPlan.name}</p>
        <br />
        <div style={{ backgroundColor: 'orange' }}>
          <div>
            <span>plan execution position in history array (First plan on position 0):</span>
            <input value={executedPlan.positionFrom0} onChange={({ target: { value } }) => setExecutedPlan({ positionFrom0: value, name: '', id: '' })}></input>
          </div>
          <div>
            <span>plan execution ID):</span>
            <input value={executedPlan.id} onChange={({ target: { value } }) => setExecutedPlan({ id: value, positionFrom0: '', name: '' })}></input>
            <p>plan name: {executedPlan.name}</p>
          </div>
        </div>

      </div>}


    </div>
  );
};

export default withRouter(PlanEvaluation);