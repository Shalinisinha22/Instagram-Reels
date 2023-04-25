import * as React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ResetPass.css';
import insta from "../Assets/instagram.png";
import { makeStyles} from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from 'react-router-dom';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { AuthContext } from '../Context/AuthContext';
import Divider from '@mui/material/Divider';






export default function ResetPass() {




  const useStyles=makeStyles({
    text1:{
      color:"grey",
      textAlign:"center",
    },
    card2:{
      height:"7.5vh", 
    },
    text2:{
        textAlign:"center"
    }
})
const classes=useStyles()

const {reset}=useContext(AuthContext)

const[email,setEmail]=useState("");
const [loading,setLoading]=useState(false);
const [err,setErr]=useState("")
const navigate=useNavigate()



let handleClick=async()=>{
  
    try{
        setErr("")
       setLoading(true)
        let res=await reset(email)
         console.log("LinK send")
         setLoading(false)
         alert(`Link is send to your email account${email}`)
         navigate("/login")

    }
    catch(err){
      setErr(err)
      setTimeout(() => {
        setErr("")
      },2000);
      setLoading(false)
   
    }
  

}





  return (
    <div className="reset-wrapper">
    

 
    <div className="reset-card">

    <Card  variant="outlined" >
        <div className="insta-logo">
        
    
      
    
        <img  src={insta} alt="Instagram"></img>
    
        </div>
    
      <CardContent>
    
       {err!="" && <Alert severity="error">{err}</Alert>} 

       <Typography className={classes.text1} variant="subtitle1" >
         Enter your email and we'll send you a link to reset password.
        </Typography>
   
      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(e)=>setEmail(e.target.value)} />
    
    
      </CardContent>

      
      <CardActions>
        <Button  color="primary" style={{borderRadius:"1rem"}}  disabled={loading} fullWidth="true" variant='contained' onClick={handleClick}>Send Link</Button>
      </CardActions>

      <CardContent>
      <Typography className={classes.text1} variant="subtitle1">
      <Divider variant="hard">OR</Divider>
  
    <Link to="/signup" style={{textDecoration:"none",color:"black"}}> Create new account </Link>
  
        </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" className={classes.card2} >
      <CardContent>
      <Typography className={classes.text1} variant="subtitle1">
      <Link to="/login" style={{textDecoration:"none",color:"black"}}>Back to login</Link>
        </Typography>
      </CardContent>
    </Card>

     
    
 

    

 
 
    </div>

 
    </div>
  
  );
}
