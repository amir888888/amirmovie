import { Backdrop, Badge, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { img_300, unavailable } from '../../config/config';
import ModelContent from '../ModelContent/ModelContent';
import './singalContent.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    
  },
}));
const SingalContent = ({id,poster,media_type,title,vote_average,date}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () =>{
    setOpen(!open)
  }
  
  return( 
  <div className='media' onClick={handleClick}>
    <Badge badgeContent={vote_average} color={vote_average>8 ? "primary" : "secondary"}/>
      <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className='title'>{title}</b>
      <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="subTitle">{date}</span>
      </span>
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClick}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
       <div> <ModelContent type={media_type} id={id} open={open}/></div>
      </Modal>



     
  </div>
  
  );
};

export default SingalContent;
