import React from 'react'
import './CirledPic.css'

function CirledPic(props) {
  return (
    <div className="CirledPic">
        <img onClick={()=>{alert('syke!')}} src={`https://image.tmdb.org/t/p/original${props.imgURL}`} alt="company-logo"/>
        <p>{props.company}</p>
      
    </div>
  );
}

export default CirledPic;
