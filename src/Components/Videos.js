import React,{useState} from 'react';
import './Video.css';
import './Post.css'
import  ReactDOM  from 'react-dom';



function Videos(props) {

  
    const handleClick=(e)=>{
      e.preventDefault();
      e.target.muted=!e.target.muted
    }
const handleScroll=(e)=>{
   let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
   if(next){
    next.scrollIntoView()
    e.target.muted=true

   }
}

  return (

  <>


 
    <video  className='video-styling' onEnded={handleScroll} onClick={handleClick}  muted="muted" >
    <source src={props.src} type="video/mp4"/> 
   </video>
 
 
  </>
  )
}

export default Videos

