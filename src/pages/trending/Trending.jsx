import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomPagination from '../../components/pagination/CustomPagination';
import SingalContent from '../../components/singalContent/SingalContent';
import './trending.css'
const Trending = () => {

  const [page, setPage] = useState(1);
  const [content, setcontent] = useState([]);

  const fetchTrending = async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

    setcontent(data.results)
  };

  useEffect(() => {
   fetchTrending()
    // eslint-disable-next-line 
  }, [page]);
  
  return( 
  <div> 
    <span className="pageTitle">Trending</span>
    <div className="trending">
      {content && content.map((c)=> <SingalContent key={c.id}
        id={c.id}
        title={c.title}
        poster={c.poster_path}
        date={c.first_air_date || c.release_date}
        media_type={c.media_type}
        vote_average={c.vote_average}
       

      />)}
    </div>
    <CustomPagination setPage={setPage} />
  </div>
  
  )
};

export default Trending;
