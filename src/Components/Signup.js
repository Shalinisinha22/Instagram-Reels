import * as React from 'react';
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Signup.css';
import insta from "../Assets/instagram.png";
import { makeStyles} from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link,useNavigate } from 'react-router-dom';


import { AuthContext } from '../Context/AuthContext';
import {  storage,database } from '../firebase';


export default function Signup() {


  const useStyles=makeStyles({
    text1:{
      color:"grey",
      textAlign:"center",
    
  

    },
    card2:{
      height:"8vh",
      marginTop:"2%",
     


    }
})
const classes=useStyles()

const[email,setEmail]=useState("");
const[password,setPass]=useState("");
const[name,setName]=useState("");
const[file,setFile]=useState(null)
const[error,setErr]=useState("")
const[loading,setLoading]=useState(false);
const navigate = useNavigate()
const {signup}=useContext(AuthContext);

const handleClick=async()=>{
  if(file==null){
    setErr("Plaese upload profile image first")
    setTimeout(()=>{
        setErr("")
    },2000)
    return;
  }
  try{
    setErr("")
    setLoading(true)
   let userObj=await signup(email,password)
   console.log(userObj)
   let uid=userObj.user.uid
  //  console.log(uid)
  
    const uploadtask=storage.ref(`/users/${uid}/ProfileImage`).put(file);
      uploadtask.on(`state_changed`,fn1,fn2,fn3);

       function fn1(snapshot){//progress
         let progress=(snapshot.bytesTransferred /snapshot.totalBytes)*100;
         console.log(`upload is ${progress} done.`)
        }
        function fn2(error){//error
          setErr(error)
          setTimeout(()=>{
             setErr("")
              },2000)
             setLoading(false) 
              return;
          }
       function fn3(){//success
          uploadtask.snapshot.ref.getDownloadURL().then((url)=>{
              database.users.doc(uid).set({
                email:email,
                userId:uid,
                fullName:name,
                profileUrl:url,
                createdAt:database.getTimeStamp()

              })
          })
          setLoading(false)
          navigate('/login')
      }
  }

  catch(err){
    setErr(err)
    setTimeout(()=>{
        setErr("")
    },2000)
  }

}




  return (
    <div className="signup-wrapper">
        
     <div className="signup-card">
     <Card  variant="outlined" >
        <div className="insta-logo">
    
        <img  src={insta} alt="Instagram"></img>
    
        </div>
    
      <CardContent>
       
        <Typography className={classes.text1} variant="subtitle1" >
          Sign up to see photos and videos from your friends
        </Typography>
      
       {error!="" && <Alert severity="error">{error}</Alert>} 
   
      <TextField id="outlined-basic" spellCheck="false" label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined" fullWidth={true} margin="dense" size='small' />
      <TextField id="outlined-basic" spellCheck="false" label="Password"  value={password} onChange={(e)=>setPass(e.target.value)} variant="outlined" fullWidth={true}  margin="dense"size='small' />
      <TextField id="outlined-basic" spellCheck="false" label="Full Name"  value={name} onChange={(e)=>setName(e.target.value)} variant="outlined" fullWidth={true}  margin="dense"size='small' />

      <Button size="small"fullWidth={true} style={{borderRadius:"1rem"}} color="secondary"variant="outlined" margin="dense" component="label" startIcon={<CloudUploadIcon color="secondary"></CloudUploadIcon>}>
        UPLOAD PROFILE IMAGE
      <input type="file"   accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])} ></input>
      </Button>
      </CardContent>

      
      <CardActions>
        <Button  color="primary" style={{borderRadius:"1rem"}} fullWidth={true} variant='contained' disabled={loading} onClick={handleClick}>SIGN UP</Button>
      </CardActions>

      <CardContent>
        <Typography className={classes.text1} variant="subtitle1">
          By signing up, you agree to our Terms and Data Policy and Cookies Policy.
        </Typography>
      </CardContent>

    </Card>
    <Card variant="outlined" className={classes.card2} >
      <CardContent>
      <Typography className={classes.text1} variant="subtitle1">
         Having an account ? <Link to="/login" style={{textDecoration:"none"}}>Login</Link>
        </Typography>
      </CardContent>
    </Card>
    </div>
    </div>
  
  );
}
