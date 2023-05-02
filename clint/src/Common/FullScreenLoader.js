import React from 'react'
import loader from "../Assets/Images/loaderTransparent.svg"
import '../Assets/Styles/loader.css';

function FullScreenLoader(){
    return(
        <div className='ProcessingDiv'>
            <div className='center-screen'>
                <img className='loader-size' src={loader} alt='loader'/>
            </div>
        </div>
    )
}



export default FullScreenLoader;