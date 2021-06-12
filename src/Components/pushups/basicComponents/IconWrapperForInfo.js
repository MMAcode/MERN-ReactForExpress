import React from 'react';
import { clippingParents } from '@popperjs/core';

const IconWrapperForInfo = ({ children, width = 40, flex, faceLeft = false }) => {
  let subChildren = React.Children.toArray(children)[0]?.props?.children?.length > 1 ? true : false;
  // console.log("SUBCHILDREN: ", subChildren);

  let thisSVG = React.useRef();
  // if (thisSVG.current) thisSVG.current.style.fill = 'white';
  React.useEffect(() => {
    if (faceLeft && thisSVG.current?.firstChild?.firstChild?.nodeName === 'path') {
      thisSVG.current.firstChild.firstChild.setAttribute('transform', `scale(-1,1), translate(-800,0)`);
    }
  }, [thisSVG])

  return (
    <div style={{
      padding: '5px',
      transform: `${faceLeft ? 'scaleX(-1)' : null}`,
      opacity: '0.5',
    }}>
      {React.Children.map(children, child => {
        if (!subChildren) {
          {/* console.log("CHILD:", child); */ }
          return React.cloneElement(child, { height: width, width, ref: thisSVG })
        }
        else {
          console.log("CHILD with kids: ", child);
          {/* console.log("CHILDREN D:", React.Children.toArray(child)[0].props.children); */ }
          let miniKids = React.Children.toArray(child)[0].props.children;

          {/* let kk = React.Children.map(child, childDeep => React.cloneElement(childDeep, { height: width, width })) */ }
          let kk = miniKids.map(childDeep => React.cloneElement(childDeep, { height: width, width }))
          console.log("KK: ", kk);
          {/* return <p>1</p> */ }
          return kk;
        }
      })}
    </div>
  );
};

export default IconWrapperForInfo;