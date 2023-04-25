import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { CircularProgress } from '@mui/material';
import Videos from './Videos';
import './Post.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import { useResolvedPath } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Comments from './Comments';
import Like2 from './Like2';
import AddComment from './AddComment';



function Post(userData) {
    console.log(userData.user)
   
  
    const[posts,setPost]=useState(null)

    const [open, setOpen] = useState(null);
    useEffect(()=>{
        let parr=[]
        const unsub=database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
        
            parr=[]
              querySnapshot.forEach((doc)=>{
                console.log(doc)
                let data={...doc.data(),postId:doc.id}
                parr.push(data)
               })
            setPost(parr)
        })
        return unsub;
      
        
      
    },[])

 
    
        const handleClickOpen = (pid) => {

            setOpen(pid);
        };
    
      const handleClose = () => {
        setOpen(false);
      }

  




      const callback=(entries)=>{
        entries.forEach((entry)=>{
           let ele=entry.target.childNodes[0]
           console.log(ele)
           ele.play().then(()=>{
               if(!ele.paused && !entry.isIntersecting){
                   ele.pause()
               }
           })
   
   
        })
     }
         
         let observer = new IntersectionObserver(callback, {threshold:0.6});
         useEffect(()=>{
            const elements=document.querySelectorAll(".videos")
              elements.forEach((element)=>{
               observer.observe(element)
              })
              return()=>{
                observer.disconnect();
              }
         },[posts])


  return (
    <div >
      {
        posts==null|| userData.user==null ?<CircularProgress></CircularProgress> :
        <>


      
      <div className="video-container">
        {
            posts.map((post,idx)=>(
              
                <React.Fragment key={idx}>
                       <div className="videos">
                           <Videos src={post.purl}></Videos>
                          <div className="fa" style={{display:"flex"}}>
                          
                          <Avatar src={post.uProfile} />
                          <h4>{post.usname}</h4>

                          </div>
                       
                       {
                        console.log(post.pid)
                       }
                          <Like userData={userData.user} postData={post}></Like>

                          <ChatBubbleIcon fontSize='large' onClick={()=>handleClickOpen(post.pid)} className='chat'></ChatBubbleIcon>
                        
                         
                  
                     
                          <Dialog
                             open={open==post.pid}
                             onClose={handleClose}
                             aria-labelledby="alert-dialog-title"
                             aria-describedby="alert-dialog-description"
                             fullWidth={true}
                             maxWidth="md"
                             box-shadow=" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                           
                           >

                            <div className="modal-container">
                                <div className="video-box">
                               <video autoPlay={true} muted="muted" controls><source src={post.purl}/></video>
                                  </div>
                              <div className="comment-container">
                                  <Card class="card1" style={{padding:"1rem"  }}>
                                   
                                      
                                   
                                       
                                <Comments  postData={post} ></Comments>   
                                      
      
                                  </Card>


                                  <Card className='card2'sx={{ bgcolor: 'primary' }}style={{marginLeft:"0.2rem" }} >
                  
                                    <Typography style={{padding:"2%"}} >
                                     {post.likes.length==0?"":`Liked by ${post.likes.length} users`}  </Typography>
                                      <div style={{display:"flex",outline:"none",textDecorationLine:"none"}}>
                                      <Like2 userData={userData.user} postData={post} style={{display:"flex",justifyContent:"center",alignItem:"center",backgroundColor:"blue"}} ></Like2>
                                      {
                                        console.log(userData.user.fullName)
                                      }
                                      <AddComment userData={userData.user} postData={post} ></AddComment>

                                     </div>
                                  </Card>
                              </div>
                            </div>


                           
                         </Dialog>
                    </div>
                </React.Fragment>

            ))
        }
      </div>
   
        </> 
      }
    </div>
  )
}

export default Post
