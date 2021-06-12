import React from 'react';
import IconWrapper from './IconWrapper';

// const rotateIcon = () => {
//   console.log("click");
// }

const IconAndText = ({ children, width }) => {
  const [animateNow, animateNowSET] = React.useState(false);
  return (
    <div
      className={animateNow ? 'iconAndText' : ''}
      onMouseDown={() => animateNowSET(true)}
      onTouchStart={() => animateNowSET(true)}
      
      onAnimationEnd={() => animateNowSET(false)}
      style={{
        display: 'flex', alignItems: 'center',
        // justifyContent: 'flex-start'
        justifyContent: 'space-evenly',
        // background: 'purple'
      }}>
      <div style={{
        display: 'inline', flex: '0 0 50px',
        // backgroundColor: 'red'
      }}>
        <IconWrapper width={width}>
          {children[0]}
        </IconWrapper>
      </div>
      <div style={{ display: 'inline', flex: 'auto' }}>
        {children[1]}
      </div>
    </div>
  );
};


export const IconAndTextInColumn = ({ children }) => {
  const [animateNow, animateNowSET] = React.useState(false);

  return (
    <div
      className={animateNow ? 'iconAndText' : ''}
      onMouseDown={() => animateNowSET(true)}
      onTouchStart={() => animateNowSET(true)}
      style={{
        display: 'flex', flexFlow: 'column', alignItems: 'center',
        // justifyContent: 'flex-start'
        justifyContent: 'center',
        // backgroundColor: 'red'
        // borderRadius: '0 0 20px 20px',

      }}>
      <div style={{
        display: 'block', flex: '0 0 50px',
        // backgroundColor: 'red'
      }}>
        <IconWrapper>
          {children[0]}
        </IconWrapper>
      </div>
      <div style={{ display: 'block', flex: '0', padding: '0 5px 1px 5px', marginTop: '-5px', fontSize: '0.8rem' }}>
        {children[1]}
      </div>
    </div>
  );
};

export default IconAndText;