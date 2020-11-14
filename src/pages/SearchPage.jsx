import React, {useState} from 'react'
import './SearchPage.css';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css';
import PreviewCard from '../components/PreviewCard'
import Navbar from '../components/Navbar'
function SearchPage() {

  //API to request --> https://api.themoviedb.org/3/search/movie?api_key=f3e744226b13ef39764f0e35686bff5e&language=en-US&query=Batman&page=1&include_adult=false
  //Handle getting data from API
  
  async function fetchItems() {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f3e744226b13ef39764f0e35686bff5e&language=en-US&query=${userInput}&page=1&include_adult=false`);
    const itemsData = await data.json();
    console.log(itemsData.results)
    setSearchResult(itemsData.results)
  }
  //Hold the Search result 
  const [searchResult, setSearchResult] = useState([])

  //User input
  const [userInput, setUserInput] = useState('');
  
  //Handle User typing
  const HandleUserTyping = event => {
    setUserInput(event.target.value);
    if (userInput !== '') {
      fetchItems();
    } else {
      setSearchResult([]);
    }

    console.log(userInput)
  }

    return (
    <div className="SearchPage">
      <Navbar />
      <div className="search-container">
          <div className="search-box">
            
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Movie"
                aria-label="Search Movie"
                aria-describedby="basic-addon2"
                value = {userInput}
                onChange={HandleUserTyping}
              />
              <InputGroup.Append>
                <Button onClick={()=> {
                  setUserInput('');
                  setSearchResult([])
                  }} variant="dark">Clear</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
      </div>

      <div className="preview-card-wrapper">
        

        {searchResult.map(item => {
          return <PreviewCard key={item.id} id={item.id} name={item.original_title} overview={item.overview} imgPath={item.poster_path} ratingScore={item.vote_average} /> 
      
        })}

      
      </div>
    </div>
  );
}

export default SearchPage;
