import React from 'react';
import TrainingPlanOverview from '../../TrainingPlanOverview';
import { postJsonDataUrlAfterAPIpushups } from '../../../../functions/postJsonData';
import PushUpsContext from '../../state/PushUpsContextState';
import PublicPlanToList from './PublicPlanToList';
import { Accordion, Card } from 'react-bootstrap';
import styled from 'styled-components';

import Toggle from 'react-toggle';

import CounterAllIn from '../../basicComponents/CounterAllIn';
import positionElementToTheTop from '../../functions/styling/positionElementToTheTop'
import Info from '../../basicComponents/Info';




const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
background-color: rgba(233, 154, 7, 0.62);
margin: 0 5px 8px 5px;
`



const PublicPlans = () => {
  let pushupContext = React.useContext(PushUpsContext);
  const { user, updateUser, publicPlans } = pushupContext;

  //set-up public plans to show
  const [publicPlansToShow, setPublicPlansToShow] = React.useState(publicPlans);
  // React.useEffect(() => { setPublicPlansToShow(publicPlans) }, [publicPlans])

  //set max reps
  let [maxRepsHere, setMaxRepsHere] = React.useState(-1);
  let [maxRepsHereToFilter, setMaxRepsHereToFilter] = React.useState(maxRepsHere);
  // let [updateFilter, setUpdateFilter] = React.useState(true); //just as toogle - when updtate filter button clicked, changes will cause filter to refresh

  //set filter conditions and max reps from user profile
  const [filterSortSearchConditions, setFilterSortSearchConditions] = React.useState({ filter: { byMaxReps: true } });
  React.useEffect(() => {
    console.log("UE USER CHANGED");
    if (user) {
      // console.log("UE USER CHANGED-filter shall be updated to A", user);
      console.log("UE USER CHANGED-filter shall be updated to ", user?.settings?.plans?.public?.filter);
      setFilterSortSearchConditions(filterSortSearchConditions => ({ ...filterSortSearchConditions, filter: user?.settings?.plans?.public?.filter }));

      if (maxRepsHere < 0) {
        setMaxRepsHere(getUserCurrentInAssMaxRepOrDefault(user).reps);
        setMaxRepsHereToFilter(getUserCurrentInAssMaxRepOrDefault(user).reps);
        // setUpdateFilter(stateBefore => !stateBefore);
      }

    }
  }, [user])

  //update list of plans to display
  React.useEffect(() => {
    console.log("FILTER_SORT_SEARCH conditions updated to: ", filterSortSearchConditions);
    let plansHere = publicPlans;
    // if (publicPlans != null && user) {
    if (publicPlans && user) {
      if (user.settings?.plans?.public?.filter?.byMaxReps) {
        plansHere = publicPlans.filter(plan => (plan.targetGroup.initialMaxReps.rangeAsReps[0] <= maxRepsHereToFilter && plan.targetGroup.initialMaxReps.rangeAsReps[1] >= maxRepsHereToFilter));
      }
      // console.log("PLANS HERE ------------------------:", plansHere);

    }
    setPublicPlansToShow(plansHere);
    console.log("PLANS TO SHOW UPDATED (SET)");
  }, [filterSortSearchConditions, publicPlans,
    // updateFilter,
    maxRepsHereToFilter])


  // const [viewController, setViewController] = React.useState(undefined);
  // console.log("Public PLANS RErendered;")
  // React.useEffect(() => {
  //   if (user) {
  //     console.log("USER in PUBLIC PLANS refreshed");
  //     setViewController(user.settings.plans);
  //     console.log("uuU: ", user.settings.plans.public.view);
  //     if (viewController)      console.log("uuu ", viewController.public.view);
  //   }
  // },[user])

  //GET public plans
  // const [publicPlans, setPublicPlans] = React.useState(null);
  // const getPublicPlans = async (positionFrom0) => {
  // let publicPlansSupportVar = await postJsonDataUrlAfterAPIpushups('/getPublicPlan_s', {});
  // setPublicPlans(publicPlansSupportVar);
  // console.log("publicPlansSupportVar: ", publicPlansSupportVar);
  // }
  // if (publicPlans === null) {
  // getPublicPlans();
  // return (publicPlans === null && <p>loading Public plans...</p>)
  // };


  const togglePublicPlansView = async () => {
    console.log("Toggle view");

    //center the text
    // console.log(e.target);
    let head = document.getElementById(`publicPlansViewSettings`);
    // console.log(head);

    let navbarHeight = document.getElementById('mainNavBar').getBoundingClientRect().height;
    // head.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await new Promise(resolve => setTimeout(resolve, 330));
    var headTop = head.getBoundingClientRect().top;
    console.log("headTop", headTop);

    window.scrollBy({
      top: headTop - navbarHeight,
      behavior: 'smooth'
    });
    //center the text - end

    let updatedUser = await postJsonDataUrlAfterAPIpushups('/plansViewSettings', { publicPlansAccordion: 'toggle' });
    // console.log("U P DA A T E ED  user: ", updatedUser);
    // console.log("public plans VIEW: ", user.settings.plans.public.view);
    updateUser({ ...updatedUser });
    // console.log("user.settings.plans.public.view: ");




    // document.getElementById(`publicPlansAccordionCard${index}`).scrollIntoView(true);
    // document.getElementById(`publicPlansAccordionCard${index}`).scrollIntoView({behavior:'smooth',block:'start'});
    // window.scrollTo(0,0);


  }


  // const commitToPlan = async (planID, planName) => {
  //   //assuming user exists...
  //   let updatedUser = await postJsonDataUrlAfterAPIpushups('/commit', { userID: pushupContext.user._id, planID, name: planName });
  //   pushupContext.updateUser(updatedUser);
  // }

  const handleViewPublicPlansToggle = async ({ target: { checked } }, what) => {
    let settings = user.settings;
    if (!settings.plans.public.listView) settings.plans.public.listView = {};
    let listView = settings.plans.public.listView;
    listView[what] = checked;

    let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateUserSettings', { fromFrontEnd: { settings } });
    updateUser({ ...updatedUser });
  }


  ////FILTER BY MAX VALUE........................START

  const getUserCurrentInAssMaxRepOrDefault = (user) => {
    if (!user) return ({ reps: 20, source: 'none' });
    let maxReps = {};
    if (user.pushupPlans.current && user.pushupPlans.current.assessments.initialAssessmentID) {
      maxReps.reps = user.assessments.find(ass => ass._id === user.pushupPlans.current.assessments.initialAssessmentID).reps;
      maxReps.source = 'initial';
      // console.log("MAX REPS from INIT ASS",maxReps);
    } else if (user.assessments && user.assessments.length > 0) {
      maxReps.reps = user.assessments[0].reps;
      maxReps.source = 'latest';
    } else return ({ reps: 20, source: 'none' });
    return maxReps;
  }
  const updateMaxRepsFromUserInput = (newValue) => {
    // console.log(newValue);
    setMaxRepsHere(newValue);
  }

  const updateFilterClicked = () => {
    console.log("update filter clicked", "max reps now:", maxRepsHere);
    // setUpdateFilter(stateBefore => !stateBefore);
    setMaxRepsHereToFilter(maxRepsHere);

    positionElementToTheTop(document.getElementById(`publicPlansViewWrapper`), 0);
  }

  const filterPlansByMaxRepsToggle = async ({ target: { checked } }) => {
    // setFilterSortSearchConditions(conditionsBefore => ({ ...conditionsBefore, filterByMaxReps: checked }));
    console.log('MAX REPS toggle runnning');
    if (!user.settings.plans.public.filter) user.settings.plans.public.filter = { byMaxReps: true };
    user.settings.plans.public.filter.byMaxReps = checked;
    console.log("user settings be updated-FILTER should be in : ", user.settings);
    let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateUserSettings', { fromFrontEnd: { settings: user.settings } });
    updateUser({ ...updatedUser });

    if (!checked) positionElementToTheTop(document.getElementById(`publicPlansViewWrapper`), 200);

  }
  ////FILTER BY MAX VALUE..........................END

  if (publicPlans === null) { return (<p>loading Public plans...</p>) }
  if (user === null || user === undefined) { return (<p>loading user...</p>) }
  else {
    //rendering this only after plans were received from DB...
    return ( 
      <div style={{ backgroundColor: 'lightBlue', padding: '0' }}>

        {/* filter sort search view */}
        <Accordion
          className='p-1'
          style={{ margin: '0', background: 'none', border: 'none', margin: '20px auto 10px auto' }}
          defaultActiveKey={user.settings.plans.public.view ? '1' : '0'}
        >
          <Card style={{ border: 'none', backgroundColor: 'transparent' }}>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="1"
              id='publicPlansViewSettings'
              onClick={togglePublicPlansView}
              // className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
              // className="p-1 m-1 bg-none MMpointer btnOpacity"
              className="bg-none MMpointer btnOpacity"
              // style={{background:'white',margin:'0px 60px 0px 60px'}}
              // style={{background:'yellow',margin:'0px 60px 0px 60px'}}
              style={{ background: '#ffd400', maxWidth: '85vw', margin: 'auto', border: 'none', borderRadius: '7px 7px 0 0' }}

            >
              {/* <p style={{ float: 'right' }}>lKS L DSLKFJ SDF  🔽</p> */}
              <h5 style={{ textAlign: 'center' }}>Filter, Sort, Search  🔽</h5>

            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <SCard style={{ border: '4px solid #ffd400', overflowY: 'auto', backgroundColor: 'white', paddingTope: '0' }}>
                {/* <div style={{ backgroundColor: 'red' }}> */}
                <div>

                  {/* <div style={{view:'flex', flexFlow:'row'}}>View */}
                  <div>{/* View */}
                    <h3>view options</h3>
                    {/* <div style={{ padding: '5px', display: 'flex', flexFlow: 'column' }}> */}
                    {/* summary */}
                    <div style={{
                      padding: '5px', display: 'inline-flex', flexFlow: 'row', alignItems: 'center', justifyContent: 'left',
                      backgroundColor: 'lightBlue', borderRadius: '40px', margin: '5px'
                    }}>

                      <Toggle
                        id='publicPlansViewSummaryToggle'
                        defaultChecked={user.settings.plans.public.listView.summary}
                        // defaultChecked={context.user ? false : true}
                        onChange={(e) => handleViewPublicPlansToggle(e, 'summary')}
                      />
                      <label style={{ margin: '0 0 0 10px', paddingRight: '10px' }} htmlFor='publicPlansViewSummaryToggle'>Summaries</label>
                    </div>
                    {/* rep range */}
                    <div style={{
                      padding: '5px', display: 'inline-flex', flexFlow: 'row', alignItems: 'center', justifyContent: 'left',
                      backgroundColor: 'lightBlue', borderRadius: '40px', margin: '5px', lineHeight: '10px'
                    }}>

                      <Toggle
                        id='publicPlansViewTargetGroupToggle'
                        defaultChecked={user.settings.plans.public.listView.targetGroup}
                        // defaultChecked={context.user ? false : true}
                        onChange={(e) => handleViewPublicPlansToggle(e, 'targetGroup')}
                      />
                      {/* <label style={{ margin: '0 0 0 10px' }} htmlFor='publicPlansViewSummaryToggle'>target group <span style={{fontSize:'5rem',height:'auto',width:'50px'}}>➳</span></label> */}
                      <label style={{ margin: '0 0 0 10px' }} htmlFor='publicPlansViewTargetGroupToggle'>Rep ranges</label>
                      <span style={{ fontSize: '2rem' }}>➳</span>
                      <Info faceLeft padding='0 0 0 20px'>
                        <p><strong>Rep Range</strong> informs you, how many reps shall you be able to do to "qualify" for specific training plan.</p>
                        <p><strong>For example</strong>, if you can do currently maximum of 30 pushups and rep range for plan XY is 40..70, that plan is currently probably too difficult for you.</p>
                        <p>To display only plans witch are appropriate for your current fitness level, use <strong>FILTER</strong> (In filter section: "Display only plans appropriate for my fitness level.")</p>
                      </Info>
                    </div>
                    {/* <div style={{ padding: '5px', display: 'flex', flexFlow: 'row', alignItems: 'center', justifyContent: 'left' }}>
                    <Toggle
                      id='publicPlansViewDescriptionToggle'
                      defaultChecked={user.settings.plans.public.listView.description}
                      // defaultChecked={context.user ? false : true}
                      onChange={(e) => handleViewPublicPlansToggle(e, 'description')}
                    />
                    <label style={{ margin: '0 0 0 10px' }} htmlFor='publicPlansViewDescriptionToggle'>Description</label>
                  </div> */}
                  </div>

                  <div> {/* Filter */}
                    <h3>filter</h3>
                    {/* <p>s {(user?.settings)?'yes':'no'}</p>
                    <p>p {(user?.settings?.plans)?'yes':'no'}</p>
                    <p>pp {(user?.settings?.plans?.public)?'yes':'no'}</p>
                    <p>f {(user?.settings?.plans?.public?.filter)?'yes':'no'}</p>
                    <p>b {user?.settings?.plans?.public?.filter?.byMaxReps.toString()}</p> */}
                    <div style={{ backgroundColor: 'lightBlue', borderRadius: '40px' }}>

                      {/* by max reps */}
                      <div style={{
                        padding: '5px', display: 'inline-flex', flexFlow: 'row', alignItems: 'center', justifyContent: 'left',
                        backgroundColor: 'lightBlue', borderRadius: '40px', margin: '5px'
                      }}>
                        <Toggle
                          id='publicPlansFilterByRepsToggleID'
                          defaultChecked={user?.settings?.plans?.public?.filter?.byMaxReps}
                          // defaultChecked={filterSortSearchConditions.filter.byMaxReps}

                          // defaultChecked={user ? false : true}
                          onChange={filterPlansByMaxRepsToggle}
                        />
                        <label style={{ margin: '0 0 0 10px' }} htmlFor='publicPlansFilterByRepsToggleID'>Display only plans appropriate for my fitness level.</label>
                      </div>

                      {filterSortSearchConditions?.filter?.byMaxReps && <div style={{ overflow: 'auto' }}>
                        <CounterAllIn settings={[1, 5, updateMaxRepsFromUserInput, maxRepsHere, '', 'reps', 0, 1000]} />

                        <div style={{ display: 'block', margin: '10px auto',textAlign:'center' }}>
                          <button style={{ borderRadius: '40px' }}
                            onClick={updateFilterClicked}>
                            Update Filter
                          </button>
                          <Info absolute faceLeft padding='0 0 0 30px'>Adjust to see plans targeted for users with different current ability.</Info>

                        </div>

                      </div>}

                      {/* <p>Display only plans of my fitness level.</p> */}
                    </div>

                  </div>
                </div>
                <div>{/* Sort */}
                  <h3>Sort</h3>
                  {/* <p>Sort by...</p>
                  <p>number of pushups to be able to do</p>
                  <p>number of training days</p>

                  <p>recommended by users</p>
                  <p>by results of other users</p> */}
                </div>
                {/* <h3>Apply changes</h3>
                <p>search by name. SEARCH</p> */}
              </SCard>
            </Accordion.Collapse>
          </Card>
        </Accordion>



        {/* info */}
        <div style={{ margin: '5px' }}>
          {/* {user.settings.plans.public.filter.byMaxReps && <p>Showing plans appropriate for people who can do currently {maxRepsHereToFilter} pushups as maximum.</p>} */}
          {filterSortSearchConditions?.filter?.byMaxReps && <p>Showing plans appropriate for people who can do currently {maxRepsHereToFilter} pushups as maximum.</p>}

        </div>

        {/* Public plans list */}
        <Accordion id='publicPlansViewWrapper' className='p-1' style={{ margin: '0', background: 'none', border: 'none' }} defaultActiveKey={-1}>
          {/* <Accordion className='p-1' style={{ margin: '0', background: 'orange', border: 'none' }}> */}

          {publicPlansToShow == null ? <p>No plans fit the requested criteria</p> : publicPlansToShow.map((plan, index) => <PublicPlanToList key={index} plan={plan} index={index} viewSetting={user.settings.plans.public.listView} />)}
        </Accordion>
      </div>
    );
  }
};

export default PublicPlans;