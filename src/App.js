import { Container } from '@mui/material';
import { BrowserRouter, Route , Routes,} from 'react-router-dom';
import './App.css';
import SimpleBottomNavigation from './components/BottomNav';
import Header from './components/header/Header'; 
import Movie from './pages/movies/Movie';
import Search from './pages/search/Search';
import Series from './pages/series/Series';
import Trending from './pages/trending/Trending';
function App() {
  return (
    <BrowserRouter>
      <Header/>
    <div className="app">
      <Container>
        <Routes>
            <Route path='/' element={<Trending/>} exact></Route>
            <Route path='/movie' element={<Movie/>}></Route>
            <Route path='/series' element={<Series/>}></Route>
            <Route path='/search' element={<Search/>}></Route>
        </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
    
  );
}

export default App;
