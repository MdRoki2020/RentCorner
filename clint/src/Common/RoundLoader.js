import React from 'react'
import roundLoader from "../Assets/Images/loader2.svg"
import '../Assets/Styles/loader.css';


function RoundLoader(){
  return (
    <div className='ProcessingDiv'>
        <div className='center-screen'>
            <img className='loader-size' src={roundLoader} alt='loader'/>
        </div>
    </div>
  )
}

export default RoundLoader;
