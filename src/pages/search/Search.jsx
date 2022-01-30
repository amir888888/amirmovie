import { SearchSharp } from '@mui/icons-material';
import { Button, Tab, Tabs, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomPagination from '../../components/pagination/CustomPagination';
import SingalContent from '../../components/singalContent/SingalContent';
import './search.css';

const Search = () => {
  const [type, settype] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  console.log(searchText);
  console.log(content);
  const handleChange = (event, newValue) => {
    settype(newValue);
    setPage(1)
  };

  const fetchSearch = async () => {
   if(searchText){
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
   }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
     // eslint-disable-next-line
  }, [type, page]);



  return (
    <>
      <div className="search">
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
          />
        <Button
         onClick={fetchSearch}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          <SearchSharp fontSize="large" />
        </Button>
      </div>
      <div className="t-tab">
        <Tabs value={type} style={{ paddingBottom: 5 }} onChange={handleChange} className="s-tab" aria-label="basic tabs example" indicatorColor='primary' textColor="primary">
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Tv Series" />

        </Tabs>
        <div className="trending">
        {content &&
          content.map((c) => (
            <SingalContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText && content.length === 0 &&(type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
      </div>
    </>
  )
};

export default Search;
