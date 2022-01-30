import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../../components/Genres';
import CustomPagination from '../../components/pagination/CustomPagination';
import SingalContent from '../../components/singalContent/SingalContent';
import useGenre from '../../hook/useGenre';

const Movie = () => {
  
  const [page, setpage] = useState(1);
  const [content, setcontent] = useState([]);
  const [numOfPages, setnumOfPages] = useState();
  const [selectedGenres, setselectedGenres] = useState([]);
  const [genres, setgenres] = useState([]);
  const genreForUrl = useGenre(selectedGenres)

  const fetchMovie = async()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`)
    console.log(data);
    setcontent(data.results)
    setnumOfPages(data.total_pages)
  }
  useEffect(() => {
   fetchMovie();
   
     // eslint-disable-next-line 
  }, [page,genreForUrl]);
  
  return( 
  <div> 
    <span className="pageTitle">Movies</span>
    <Genres type={'movie'}
      selectedGenres={selectedGenres}
      setselectedGenres={setselectedGenres}
      genres={genres}
      setgenres={setgenres}
      key={genres.id}
      setpage={setpage}
    />
    <div className="trending">
      {content && content.map((c)=> <SingalContent key={c.id}
        id={c.id}
        title={c.title}
        poster={c.poster_path}
        date={c.first_air_date || c.release_date}
        media_type="Movie"
        vote_average={c.vote_average}
       

      />)}
    </div>
    {numOfPages > 1 && (
       <CustomPagination setPage={setpage} numOfPages={numOfPages}/>
    )}
    </div>);
};

export default Movie;


