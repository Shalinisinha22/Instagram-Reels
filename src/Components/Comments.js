import React, { useState,useEffect } from 'react';
import { database } from '../firebase';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function Comments({postData}) {
    const[comments,setComments]=useState(null)
 
    const myFunction=async()=>{
         let arr=[]
      for(let i=0;i<postData.comments.length;i++){
       let data=await   database.comments.doc(postData.comments[i]).get()
           arr.push(data.data())    
      }
     setComments(arr)
    }

   useEffect(()=>{
    
        myFunction()
    },[postData])


  return (
    <div>
      {
        comments==null?<CircularProgress></CircularProgress>:
        <>
            {
                comments.map((comment,index)=>(

                    <div style={{display:"flex",backgroundColor:"#f1f2f6",borderRadius:"2rem",marginBottom:"1rem"}} >
                       <Avatar style={{marginTop:"2%",marginLeft:"2%"}} src={comment.uProfileImage} />
                       <p>&nbsp;<span style={{fontWeight:"bold"}}>{comment.uName}</span>&nbsp; {comment.text}</p>
                    </div>
                ))
            }
      </>
      }
    </div>
  )
}

export default Comments
