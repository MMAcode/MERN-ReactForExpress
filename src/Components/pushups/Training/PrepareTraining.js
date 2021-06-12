import React from 'react';
import pushupsContext from '../state/PushUpsContextState';
import InitialAssessment from '../assessment/InitialAssessment';
import { withRouter } from 'react-router-dom';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import { returnNumberOfDaysMissingCurrentSchedulleOrUndefined } from '../Home';
import UsabilityIssues from './UsabilityIssues';
import { returnTrueIfDatesHaveTheSameDay } from '../functions/basics';



// import PushupsContext from '../state/PushUpsContextState'

const PrepareTraining2 = ({ history }) => {
  let context = React.useContext(pushupsContext);
  let { user } = context;
  const [reschedulingInfo, setReschedulingInfo] = React.useState(null);
  const [usabilityIssues, setUsabilityIssues] = React.useState({ checks: { scheduleChecked: false, lastTrainingChecked: false, lastTrainingCheckedPREP: false } });
  let c0 = usabilityIssues.checks.lastTrainingCheckedPREP;
  let cA = usabilityIssues.checks.scheduleChecked;
  let cB = usabilityIssues.checks.lastTrainingChecked;
  console.log("prepareTraining-2-Runing",c0,cA,cB, usabilityIssues);

  React.useEffect(() => {
    //reset usabilityIssues any time user updates
    // setUsabilityIssues({ checks: { scheduleChecked: false, lastTrainingChecked: false, lastTrainingCheckedPREP: false } });
    // console.log("prepareTraining-2-Runing-userEffectAcivated", usabilityIssues);


    // console.log("USER EFFECT in training prep");
    if (context.user && context.user.pushupPlans.current && context.user.pushupPlans.current.assessments.initialAssessmentID) {
      let { user, updateUser } = context;
      let scheduleDayNumberFrom0 = user.pushupPlans.current.scheduleDayToDoFrom0;

      /////ALL in summary: 
      //1.if last training from previous day existed, update scheduledaytodo first
      //2. check that day to do against the schedule.if sch

      //COULD BE DELETED AS SHOULD NEVER RUNmini bug important bug fix - update schedule number if last training was not finished (shall be done in unfinished training section but needs to be done before the schedule!)
      //but just needed to create lastTraining object to identify of ot was unfinished training
      if (usabilityIssues.checks.lastTrainingCheckedPREP === false) {
        console.log("mini bug-fix running1");

        //check if last training finished
        let dateToday = new Date();
        let dateOfLastTrainingAsStringOrNull = user.pushupPlans.current.trainingHistory ? (user.pushupPlans.current.trainingHistory.length > 0 ? user.pushupPlans.current.trainingHistory[0].date : null) : null;
        if (dateOfLastTrainingAsStringOrNull !== null) {//=if previous training exists
          let datesAreTheSame = returnTrueIfDatesHaveTheSameDay(dateToday, dateOfLastTrainingAsStringOrNull);
          if (!datesAreTheSame
            && user.pushupPlans.current.trainingHistory[0].completed !== true
          && !user.pushupPlans.current.trainingHistory[0].potentialUnfinishedTrainingAccounted) {
            /////uncompleted->  update schedule day to do
            console.log("mini bug-fix running2");
            usabilityIssues.lastTraining = { updatedScheduleDayToDoFrom0: scheduleDayNumberFrom0 }; //for DB in next component
            usabilityIssues.lastTraining.completed = false;
            if (user.pushupPlans.current.trainingHistory[0].scheduleDayUpdated !== true)scheduleDayNumberFrom0++; //for schedule here
          }
        }
      }

      //check if training is (over)due:
      const dueDateIsAheadThisMuch = returnNumberOfDaysMissingCurrentSchedulleOrUndefined(user);

      //schedule check Once:
      if (usabilityIssues.checks.scheduleChecked === false) {
        ////////update usability locally
        let usability = user.pushupPlans.current.usability;
        //create if doesn't exist (on older plans/can be removed with time)
        if (usability === undefined) {
          console.log("Creating 'USABILITY' property as this user didn't have one yet");
          usability = {
            daysOffSchedule: 0,
            unfinishedTrainings: 0,
            rating: 100
          }
        }

        // user.pushupPlans.current.usability = usability;
        //update usability
        let usabilityOld = { ...usability };
        // usabilityIssues.usabilityOriginal = usability;
        usabilityIssues.usabilityOriginal = usabilityOld;
        //schedule
        if (dueDateIsAheadThisMuch < 0) {//=user is late, change validity and reschedule trainings
          console.log("dueDateIsAheadThisMuch: ", dueDateIsAheadThisMuch);


          usability.daysOffSchedule = usability.daysOffSchedule + (dueDateIsAheadThisMuch * (-1));
          usability.rating = 100 - (usability.daysOffSchedule + usability.unfinishedTrainings) * 10;
          // console.log(usability);

          //inform user (and update DB from there)
          // setUsabilityIssues({ schedule: { usability, usabilityOld, daysLateToday: -dueDateIsAheadThisMuch } });
          usabilityIssues.schedule = { usability, usabilityOld, daysLateToday: -dueDateIsAheadThisMuch };
          usabilityIssues.finalUsabilityForDB = usabilityIssues.schedule.usability;
          // console.log("USA5:", usabilityIssues.finalUsabilityForDB);


          ///////reschedule
          let updatedSchedule = user.pushupPlans.current.schedule;
          // let scheduleDayNumberFrom0 = user.pushupPlans.current.scheduleDayToDoFrom0;
          // let scheduleDayNumberFrom0 = 4;
          // console.log("scheduleDayNumberFrom0: ", scheduleDayNumberFrom0);
          //populate schedule starting with current day with new dates
          let timeNowInMs = new Date().getTime();
          let counter = 0;
          for (let i = scheduleDayNumberFrom0; i < updatedSchedule.length; i++) {
            updatedSchedule[i].dueDate = new Date(timeNowInMs + 24 * 60 * 60 * 1000 * counter); //i adds 1 day extra starting with nothing for today
            counter++;
          }
          usabilityIssues.schedule.updatedSchedule = updatedSchedule;
        };
        usabilityIssues.checks.scheduleChecked = true;
      }

      //training finished check once (if not checked in the past (earlier this day) already)
      if (usabilityIssues.checks.lastTrainingChecked === false)       {
        //check if last training finished
        let dateToday = new Date();
        let dateOfLastTrainingAsStringOrNull = user.pushupPlans.current.trainingHistory ? (user.pushupPlans.current.trainingHistory.length > 0 ? user.pushupPlans.current.trainingHistory[0].date : null) : null;
        if (dateOfLastTrainingAsStringOrNull !== null) {//=if previous training exists
          let datesAreTheSame = returnTrueIfDatesHaveTheSameDay(dateToday, dateOfLastTrainingAsStringOrNull);
          if (!datesAreTheSame
            && user.pushupPlans.current.trainingHistory[0].completed !== true
            && !user.pushupPlans.current.trainingHistory[0].potentialUnfinishedTrainingAccounted
          ) {
            /////uncompleted->  update usability + info

            console.log("...usabilityIssues.usabilityOriginal: ", usabilityIssues.usabilityOriginal);
            //update validity
            usabilityIssues.lastTraining.usabilityNewest = usabilityIssues.schedule ? JSON.parse(JSON.stringify(usabilityIssues.schedule.usability)) : JSON.parse(JSON.stringify(usabilityIssues.usabilityOriginal))
            usabilityIssues.lastTraining.usabilityNewest.unfinishedTrainings = usabilityIssues.lastTraining.usabilityNewest.unfinishedTrainings + 1;
            usabilityIssues.lastTraining.usabilityNewest.rating = usabilityIssues.lastTraining.usabilityNewest.rating - 10;
            usabilityIssues.finalUsabilityForDB = usabilityIssues.lastTraining.usabilityNewest;
            // console.log("USA10:", usabilityIssues.finalUsabilityForDB);
          }
        }
        usabilityIssues.checks.lastTrainingChecked = true;
      }



      setUsabilityIssues({ ...usabilityIssues });

      //=if issue(s) found...
      // console.log("UUUUUU usabilityIssues :", usabilityIssues);
      if (usabilityIssues.schedule || usabilityIssues.lastTraining) {
        // setReschedulingInfo({usability,usabilityOld,daysLateToday:-dueDateIsAheadThisMuch});
        setReschedulingInfo({ ...usabilityIssues });

      } else { //=no issue found...
        console.log("OK OK OK OK  :", usabilityIssues);

        history.push('/pushups/runMyTraining');
      }
    }
  }, [user])


  return (
    <div>
      {/* <h1>Training xx</h1> */}
      {!context.user ? <p>you are guest. Login first(??)</p> :
        !context.user.pushupPlans.current ? <p>select a plan first.</p> :
          !context.user.pushupPlans.current.assessments.initialAssessmentID ? <InitialAssessment />
            : reschedulingInfo !== null ? <UsabilityIssues data={reschedulingInfo} /> : <p>Loading...</p>
      }
    </div>
    // : reschedulingInfo !== null ? <UsabilityIssues usability={reschedulingInfo.usability} usabilityOld={reschedulingInfo.usabilityOld} days={reschedulingInfo.daysLateToday} /> : <p>Loading...</p>
  );
};

export default withRouter(PrepareTraining2);