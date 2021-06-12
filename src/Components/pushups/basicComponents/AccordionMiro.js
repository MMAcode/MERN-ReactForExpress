import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import positionElementToTheTop from '../functions/styling/positionElementToTheTop';
import { clippingParents } from '@popperjs/core';

// height also ='auto'
const AccordionMiro = ({ children, bg = '#ffd400', titleHeight = 0, initialCardOpen = '0', cardOpenHandler }) => {
  // console.log("MIROACCCordion re-rendering, cardOpen: ", cardOpenHandler);
  const [cardNumberAsStringToShow, cardNumberAsStringToShowSET] = React.useState(initialCardOpen);

  const [wantedTitleHeightHere, wantedTitleHeightHereSET] = React.useState(titleHeight);
  const [titleHeightHere, titleHeightHereSET] = React.useState();
  const CardRef = React.useRef();
  const titleRef = React.useRef();
  React.useEffect(() => {
    console.log("MiraACCCCCCORDION INITIALIZED");
    let heightHere = titleRef.current.getBoundingClientRect().height;
    if (titleHeight === 'auto') wantedTitleHeightHereSET(heightHere);
    titleHeightHereSET(heightHere);
  }, [])

  // console.log(children);

  const handleTitleClick = () => {
    // console.log("click");
    if (cardOpenHandler) cardOpenHandler[1](before => { if (before != '1') { return '1' } else { return '0'; } })
    else cardNumberAsStringToShowSET(before => { if (before != '1') { return '1' } else { return '0'; } });

    positionElementToTheTop(CardRef.current, 350);
  }

  // React.useEffect(() => {
  //   if (cardOpenHandler) {
  //     // console.log("rerenderSituation: ", rerenderSituation);
  //     // console.log("clickSituation: ", clickSituation);
  //     // console.log("titleToggleClicked: ", titleToggleClicked);
  //     console.log("MIROACCORDION cardOpenHandlerCHANGED to: ", cardOpenHandler);
  //   }
  // }, [
  //   // rerenderSituation, clickSituation
  //   cardOpenHandler,
  //   initialCardOpen,
  // ])

  return (
    <Accordion
      className='p-1'
      style={{
        margin: '0',
        background: 'none',
        border: 'none',
        minHeight: '1px',
        overflow: 'show',
        // margin: '20px auto 10px auto'
      }}
      // defaultActiveKey='0'
      // activeKey={(cardOpen&&!titleToggleClicked) ? cardOpen : cardNumberAsStringToShow}
      // activeKey={cardNumberAsStringToShow}
      activeKey={cardOpenHandler ? cardOpenHandler[0] : cardNumberAsStringToShow}
    >
      <Card style={{
        border: 'none',
        backgroundColor: 'transparent',
        overflow: 'visible',
        // display:'inline',
        // position:'relative'
      }}>
        <Accordion.Toggle
          as={Card.Header}
          eventKey='1'
          ref={CardRef}
          onClick={handleTitleClick}
          className="bg-none MMpointer btnOpacity"
          style={{
            background: bg,
            maxWidth: '85vw',
            margin: '0 10% 0 auto', //to adjust position of the HEADER,
            // height: '0',
            marginTop: `${wantedTitleHeightHere - titleHeight}`,
            border: 'none', borderRadius: '7px 7px 0 0',
            borderBottom: '1px dotted rgba(0, 0, 0, 0.47)',
            overflow: 'visible',
            padding: '0',
            // display:'inline'
            // background: 'linear-gradient(lightGray 60 %, white)',
            // boxShadow: 'rgba(0, 0, 0, 0.5) 0px 5px 5px 0px'
          }}
        >
          <div ref={titleRef}>{children[0]}</div>
          {/*  🔽 */}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card style={{
            border: `4px solid ${bg}`, overflowY: 'auto',
            backgroundColor: bg,
            paddingTope: '0'
          }}>
            {children[1]}
          </Card>
        </Accordion.Collapse>
      </Card>
    </Accordion >

  );
};

export default AccordionMiro;