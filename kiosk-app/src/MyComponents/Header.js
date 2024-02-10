import React from 'react'


import { useNavigate } from 'react-router-dom';



export default function Header(props) {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back one step
  };
  return (
    <header className='App-header'>
        {props.backButton?
          <div className='backButton'> 
            <img src="/images/back 1.png" alt="??"  onClick={goBack}/>
         </div> 
    
       : ""}
      <div className='logo'>
        <img src="/images/Elevate_logo 1.png" alt="??" />
      </div>
    </header>
  )
}
