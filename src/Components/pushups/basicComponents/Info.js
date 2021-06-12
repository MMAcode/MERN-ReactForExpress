import React from 'react';
import IconWrapperForInfo from './IconWrapperForInfo';
import { ReactComponent as IconInfo } from '../../../images/icons/info.svg';
import { Popover } from '@material-ui/core';


const Info = ({ children, width = 25, faceLeft = false, absolute = false, up = 0,right,left, padding }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  let position = absolute ? {
    bottom: `${up}px`,
    right: `${right}px`,
    left: `${left}px`,
  } : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // document.querySelectorAll('.iconInfoWrapper').forEach(icon => icon.style.display = 'none');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  return (
    <div style={{ position: 'relative', display: 'inline', }} className='iconInfoWrapper'>
      <div style={{
        // position: `${absolute ? 'absolute' : 'relative'}`,
        position: `${absolute ? 'absolute' : 'relative'}`,
        display: 'inline-block',
        // padding: `${absolute? 0: padding}`,
        padding: `${padding}`,
        ...position
      }}>
        <div onClick={handleClick}
          style={{
            display: 'inline-block',
            
          }}
        >
          <IconWrapperForInfo width={width} faceLeft={faceLeft}><IconInfo /></IconWrapperForInfo>
        </div>
        <Popover
          // id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {/* <Typography className={classes.typography}>The content of the Popover.</Typography> */}
          <div style={{ padding: '10px', border: '2px solid black' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ display: 'inline-block', backgroundColor: 'yellow', width: '50px', height: 'auto', borderRadius: '100px', border: '2px solid black' }}>?</h2>
            </div>
            <div className='infoBubble'>{children}</div>

          </div>


        </Popover>
      </div>
    </div>
  );
};

export default Info;