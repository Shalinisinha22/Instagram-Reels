import React, { useState,useEffect } from 'react';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import './Post.css'
import { database } from '../firebase';


function Like({userData,postData}) {
    const [like,setLike]=useState(null)
    console.log(userData.userId)
    console.log(postData.pid)

    useEffect(()=>{
    let check=postData.likes.includes(userData.userId)?true:false
    setLike(check)
    },[postData])//if like & dislike occur

    const handleLike=()=>{
       if(like==true){

       
       let narr=postData.likes.filter((elem)=> elem!=userData.userId)
          database.posts.doc(postData.postId).update({
             likes:narr
          })
        
        }
       else{

          let narr=[...postData.likes,userData.userId];
          database.posts.doc(postData.postId).update({
             likes:narr
          })

       }
    
       return;
    
    }
  

  return (

   
    <div>
      {
        like!=null?
        <>
      
        {
          like==true?< FavoriteSharpIcon fontSize='large' onClick={handleLike} className={`icon-styling like`}></ FavoriteSharpIcon>
          :< FavoriteSharpIcon fontSize='large' onClick={handleLike} className={`icon-styling unlike`}></ FavoriteSharpIcon>
    
          }
     </>
        :
        <>
        
        </>
      }
    </div>
   )
}

export default Like
