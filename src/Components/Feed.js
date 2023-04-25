import React, { useState } from 'react';
import { useContext,useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import UploadFile from './UploadFile';
import { database } from '../firebase';
import Post from './Post';
import Navbar from './Navbar';





function Feed() {
  
   
    const {user}=useContext(AuthContext) 

    const[userData,setUserData]=useState("")
  
   
  
   




  useEffect(()=>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setUserData(snapshot.data())
    })
    return ()=> {unsub()}
   },[user])


  return (

    <>
    <Navbar userData={userData}></Navbar>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} >
   

      <UploadFile user={userData}></UploadFile>
      <Post user={userData}></Post>
      
  
      </div>
      </>
   
    
    
  
 
   
  )
}

export default Feed
