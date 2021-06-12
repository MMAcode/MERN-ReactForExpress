/////// to use in external component:
// import positionElementToTheTop from '../functions/styling/positionElementToTheTop';
// const planAdjustPublicRef = React.useRef(null);
/////in the element:
// ref = { planAdjustPublicRef }
// onClick = {()=> positionElementToTheTop(planAdjustPublicRef.current, 350)}


const positionElementToTheTop = async (element, delayInMs) => {
  // let head = document.getElementById(`publicPlansAccordionCard${index}`);
  // console.log(element);

  let navbarHeight = document.getElementById('mainNavBar').getBoundingClientRect().height;
  // head.scrollIntoView({ behavior: 'smooth', block: 'start' });
  await new Promise(resolve => setTimeout(resolve, delayInMs));
  var ElementTop = element.getBoundingClientRect().top;
  // console.log("headTop", headTop);

  window.scrollBy({
    top: ElementTop - navbarHeight,
    // top: headTop,
    left: 0,
    behavior: 'smooth'
  });
}

export default positionElementToTheTop;