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

export const returnPersonalPlanFromPlanID = (user, planID) => {
  // console.log(planID, personalPlans);

  return user.pushupPlans.personal.find(plan => plan._id === planID)
}

export const returnAssessmentFromAssID = (user, assID) => {
  let wanted = user.assessments.find(ass => ass._id === assID);
  return wanted;
}


export const returnTrueIfDatesHaveTheSameDay = (d1a, d2a) => {
  const d1 = new Date(d1a);
  const d2 = new Date(d2a);
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export const returnDaysDifference = (todayA, otherDayA) => { //-3 returned = other day is 3 days older
  // console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  // console.log("todayA: ", todayA, "otherDayA: ", otherDayA);
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let otherDayIsThisNumberOfDaysAhead = 0;
  const today = new Date(todayA);
  const otherDay = new Date(otherDayA);
  console.log("today: ", today, "otherDay: ", otherDay);



  let smallerThenBigger = [{}, {}];
  if (today - otherDay > 0) {
    smallerThenBigger[0].date = otherDay;
    smallerThenBigger[0].name = 'otherDay';
    smallerThenBigger[1].date = today;
    smallerThenBigger[1].name = 'today';
  } else {
    smallerThenBigger[0].date = today;
    smallerThenBigger[0].name = 'today';
    smallerThenBigger[1].date = otherDay;
    smallerThenBigger[1].name = 'otherDay';
  }

  //keep adjusting dates until the same/ count adjustments and watch which is which
  while (!returnTrueIfDatesHaveTheSameDay(smallerThenBigger[0].date, smallerThenBigger[1].date)) {
    //add day to the smaller day
    smallerThenBigger[0].date = new Date(smallerThenBigger[0].date.getTime() + oneDay);
    if (smallerThenBigger[0].name === 'today') { otherDayIsThisNumberOfDaysAhead++; }
    else { otherDayIsThisNumberOfDaysAhead--; }
  }
  return otherDayIsThisNumberOfDaysAhead;
}

export const return0IfLastTrainingDoesntExist1IfDateAsToday2IfDifferentDate = (user) => {
  if (!user.pushupPlans.current
    || !user.pushupPlans.current.trainingHistory
    || !(user.pushupPlans.current.trainingHistory.length > 0)) {
    return 0;
  }

  let dateToday = new Date();
  let dateOfLastTraining = user.pushupPlans.current.trainingHistory[0].date;
  let datesAreTheSame = returnTrueIfDatesHaveTheSameDay(dateToday, dateOfLastTraining);
  return datesAreTheSame ? 1 : 2;
};

export const returnAnyPlanFromPlanID = (planID, typePersonalOnlyFinishedPublic, personalPushupPlans, publicPushupPlans) => {//type: "yes-only" "yes-finished" "public"
  // console.log("PPPplanID, typePersonalOnlyFinishedPublic: ",planID, typePersonalOnlyFinishedPublic);
  // console.log("typePersonalOnlyFinishedPublic:" + typePersonalOnlyFinishedPublic + '.');
  if (typePersonalOnlyFinishedPublic === 'yes-only') { console.log("1"); return personalPushupPlans.personal.find(plan => plan._id === planID); }
  else if (typePersonalOnlyFinishedPublic === 'yes-finished') { console.log("2"); return personalPushupPlans.personalFinished.find(plan => plan._id === planID); }
  else if (typePersonalOnlyFinishedPublic === 'public') { console.log("3"); return publicPushupPlans.find(plan => plan._id === planID); }
  else { console.log("error in 'returnAnyPlanFromPlanID'."); }

}