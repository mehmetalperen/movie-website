import React from 'react'
import Navbar from './components/Navbar'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from './pages/SearchPage'
import MovieDetailPage from './pages/MovieDetailPage'
import LikedMoviesPage from './pages/LikedMoviesPage'

//button colors --> #81c784
//background colors --> #ff8f00
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={SearchPage}/>
          <Route path="/moviedetail/:id" component={MovieDetailPage}/>
          <Route path="/likedmovies" component={LikedMoviesPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
