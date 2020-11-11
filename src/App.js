import { json } from 'body-parser';
import React, {useEffect} from 'react'
import './App.css';

function App() {



  useEffect(() => {
    fetchItems();
  }, [])
  const fetchItems = async() => {
    const data = await fetch('http://www.omdbapi.com/?apikey=79838495');
    const itemsData = await data.json()
    console.log(itemsData);
  }
  return (
    <div className="App">
      <h1>what up</h1>
    </div>
  );
}

export default App;


//http://www.omdbapi.com/?apikey=79838495
