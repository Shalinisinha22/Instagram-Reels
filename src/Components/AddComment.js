import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { database,storage } from '../firebase';


function AddComment({userData,postData}) {
    console.log(userData.fullName)
    const[text,setText]=useState("")
  const  handleChange=(e)=>{
      setText(e.target.value)
  }

  const handleClick=()=>{
    let obj={
        text:text,
        uProfileImage:userData.profileUrl,
        uName:userData.fullName
      }
      database.comments.add(obj).then((doc)=>{
        database.posts.doc(postData.postId).update({
            comments:postData.comments!=null?[...postData.comments,doc.id]:[doc.id]
        })
      })
      setText('')
  }


  
  return (
    <div style={{display:"flex",width:"100%",textAlign:"center"}}>
      
      <TextField  placeholder="Add comment" sx={{width:'80%'}} style={{display:"flex",justifyContent:"center",alignItem:"center"}}variant="filled" value={text} onChange={handleChange}   ></TextField> 
      <Button variant="contained" onClick={handleClick} style={{width:"20%",height:"80%",marginTop:"1%"}}>POST</Button>
    

    </div>
  )
}

export default AddComment
