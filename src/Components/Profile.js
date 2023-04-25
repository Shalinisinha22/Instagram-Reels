import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { Avatar, CircularProgress, Typography } from '@mui/material';
import Navbar from './Navbar';
import './Profile.css';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Comments from './Comments';
import Like2 from './Like2';
import AddComment from './AddComment';

function Profile() {
    const {id}=useParams()
    const[userData,setUserData]=useState(null)
    const[posts,setPosts]=useState(null)
    const [open, setOpen] = useState(null);

    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data())
        })
    },[id])


    const asyncFunc=async()=>{
        if(userData!=null){
            let parr=[]
            for(let i=0;i<userData.postIds.length;i++){
              let postData=await database.posts.doc(userData.postIds[i]).get()
              parr.push({...postData.data(),postId:postData.id})
            }
            setPosts(parr)
        }

    }

    useEffect(()=>{
          asyncFunc()
    })


    const handleClickOpen = (pid) => {

        setOpen(pid);
    };

  const handleClose = () => {
    setOpen(false);
  }


 

  return (

    <>
    {
      posts==null || userData==null?  <center><CircularProgress></CircularProgress></center>  
     
      :
      <>


      
      {
        posts.map((post)=>(
            console.log(post)
        ))
      }
     <Navbar className="navbar" userData={userData}></Navbar>
     <div className="spacer">
     </div>
     <div className="container">
          <div className="upper-part">
              <div className="profile-image">
                <Avatar className='img' src={userData.profileUrl}></Avatar>
                <Typography variant="h5" style={{display:"flex",alignItems:"center",marginLeft:"0.2rem"}}>
                     
                     {userData.fullName}
                </Typography>

              </div>
              <div className="info">
            
                <Typography variant="h5" style={{textAlign:"center",marginRight:"2rem"}}>
                       Email <br/>
                     {userData.email}
                </Typography>
                <Typography variant="h6" style={{textAlign:"center",marginRight:"2rem"}}>
                         Posts<br/>
                         {userData.postIds.length}
                </Typography>
              </div>
          </div>
          <hr className="divider"style={{marginTop:"2rem",marginBottom:"3rem"}}/>



          <div className="profile-videos">

         
          {
            posts.map((post,idx)=>(
               
              
                <React.Fragment key={idx}>
                    <div className='video'>
                  <video onClick={()=>handleClickOpen(post.pid)} muted="muted" ><source src={post.purl} /></video>
                                 
                     
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
                                {
                                   console.log(post)
                                 }
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
                                      <Like2 userData={userData} postData={post} style={{display:"flex",justifyContent:"center",alignItem:"center",backgroundColor:"blue"}} ></Like2>
                                      {
                                        console.log(userData.fullName)
                                      }
                                      <AddComment userData={userData} postData={post} ></AddComment>

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
     
 </div>
      </>
    }
   </>
  

  )
}

export default Profile
