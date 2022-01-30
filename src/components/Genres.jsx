import React, { useEffect } from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';

const Genres = ({
  selectedGenres,
  setselectedGenres,
  genres,
  setgenres,
  setpage,
  type
}) => {

  const handleAdd = (g) =>{
    setselectedGenres([...selectedGenres, g]);
    setgenres(genres.filter((genre)=> genre.id !== g.id ));
    setpage(1)
  }

  const handleRemove = (g) =>{
    setselectedGenres(selectedGenres.filter((genre)=> genre.id !== g.id ));
    setgenres([...genres, g]);
    setpage(1)
  }

  const fetchGenres = async() => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    `)
    // console.log(data);
    setgenres(data.genres)
  }

  useEffect(() => {
    fetchGenres();
    return () => {
      setgenres({})
    };
    // eslint-disable-next-line
  }, []);
  
  return <div style={{padding:"6px 0"}}>
    {selectedGenres && selectedGenres.map((g)=>(
      <Chip style={{margin:2}}
      color='primary'
       size='small' clickable 
       label={g.name}
       key={g.id}
       onClick={()=>handleAdd(g)}
       onDelete={()=>handleRemove(g)}
       />
    ))}
    {genres && genres.map((g)=>(
      <Chip style={{margin:2, backgroundColor:"white"}}
       size='small' clickable 
       key={g.id}
       label={g.name}
       onClick={()=>handleAdd(g)}
       />
    ))}
      
  </div>;
};

export default Genres;
