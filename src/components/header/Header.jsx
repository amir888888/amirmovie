import React from 'react';
import '../header/header.css'
import { LiveTvRounded, MovieFilterRounded ,} from '@mui/icons-material';
const Header = () => {
  return(
    <span onClick={()=>window.scroll(0,0)} className="header">
    <MovieFilterRounded style={{fontSize:"6vw"}}/> Entertaimnet HUB <LiveTvRounded style={{fontSize:"6vw"}}/>
</span>
  )
};

export default Header;
