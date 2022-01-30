import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@mui/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: 'fixed',
    bottom: 0,
    backgroundColor: "#2d313a",
    zindex: 100,
    color: 'white'
  }
})
export default function SimpleBottomNavigation(history) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate('/');
    else if (value === 1) navigate('/movie');
    else if (value === 2) navigate('/series');
    else if (value === 3) navigate('/search');

  }, [value, navigate]);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
      >
        <BottomNavigationAction style={{ color: 'white' }} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{ color: 'white' }} label="Movie" icon={<MovieIcon />} />
        <BottomNavigationAction style={{ color: 'white' }} label="TV Shows" icon={<LiveTvIcon />} />
        <BottomNavigationAction style={{ color: 'white' }} label="Search" icon={<SearchIcon />} />

      </BottomNavigation>
    </Box>
  );
}
