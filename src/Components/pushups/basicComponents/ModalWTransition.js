import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


// closeWithButton to close modal only with button
export default function ModalWTransition({ title, children, closeWithButton, startOpen=false, buttonAction=()=>{} }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(startOpen);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!closeWithButton) setOpen(false);
  };

  return (
    <div>

      <button type="button" onClick={handleOpen}
        style={{
          display: 'block', fontSize: '0.7rem', margin: ' 0 10px 0 auto', border: 'none',
          // background: 'lightGray'
          background: 'none',
          color:'gray',
          textDecoration:'dotted underline gray'
        }}
      >
        Show intro-screen again
      </button>

      {/* https://material-ui.com/api/modal/ */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>
            {children}
            {closeWithButton &&
              <button style={{ display: 'block', margin: '15px auto 0 auto' }} onClick={() => { setOpen(false); buttonAction();}}>Understood</button>}


          </div>
        </Fade>
      </Modal>
    </div>
  );
}
