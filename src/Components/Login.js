import * as React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import insta from "../Assets/instagram.png";
import bg from "../Assets/insta.png";
import { makeStyles} from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.jpg";
import img5 from "../Assets/img5.jpg";
import { AuthContext } from '../Context/AuthContext';



export default function Login() {

  // let store=useContext(AuthContext)
  // console.log(store)


  const useStyles=makeStyles({
    text1:{
      color:"grey",
      textAlign:"center",
    
  

    },
    card2:{
      height:"7.5vh",
      marginTop:"2%",
     
    },
    text2:{
        textAlign:"center"
    }
})
const classes=useStyles()

const[email,setEmail]=useState("");
const[password,setPass]=useState("");
const [error,setErr]=useState("");
const[loading,setLoading]=useState(false);
const navigate = useNavigate();
const {login}=useContext(AuthContext)


let handleClick=async()=>{

  try{
    setErr("");
    setLoading(true)
    let res= await login(email,password);
     setLoading(false);
      navigate("/")
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
    <div className="login-wrapper">
        
      <div className="imgcar" style={{backgroundImage:'url('+bg+')',backgroundSize:"cover"}}>
        <div className="car">
        <CarouselProvider
            visibleSlides={1}
             totalSlides={5}
            //  step={3}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
          
           
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
        >
          <Slider>
            <Slide index={0}><Image src={img1}></Image></Slide>
            <Slide index={1}><Image src={img2}></Image></Slide>
            <Slide index={2}><Image src={img3}></Image></Slide>
            <Slide index={3}><Image src={img4}></Image></Slide>
            <Slide index={4}><Image src={img5}></Image></Slide>
          </Slider>
        </CarouselProvider>
        </div>
      </div>



    <div className="login-card">
    <Card  variant="outlined" >
        <div className="insta-logo">
    
        <img  src={insta} alt="Instagram"></img>
    
        </div>
    
      <CardContent>
    
       {error!="" && <Alert severity="error">{error}</Alert>} 
   
      <TextField id="outlined-basic" spellCheck="false" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <TextField id="outlined-basic" spellCheck="false" label="Password" variant="outlined" fullWidth={true}  margin="dense"size='small' value={password} onChange={(e)=>setPass(e.target.value)}/>
      <TextField id="outlined-basic" spellCheck="false" label="Full Name" variant="outlined" fullWidth={true}  margin="dense"size='small' />
      <Typography className={classes.text2} variant="subtitle1" color="primary">
        <Link to="/reset"  style={{textDecoration:"none"}}>  FORGOT PASSWORD? </Link>
        </Typography>
   
      </CardContent>

      
      <CardActions>
        <Button  color="primary" style={{borderRadius:"1rem"}} fullWidth={true} variant='contained' disabled={loading} onClick={handleClick}>LOGIN</Button>
      </CardActions>
      </Card>

      <Card variant="outlined" className={classes.card2} >
      <CardContent>
      <Typography className={classes.text1} variant="subtitle1">
         Don't have an account ? <Link to="/signup" style={{textDecoration:"none"}}>Sign up</Link>
        </Typography>
      </CardContent>
    </Card>

    

 
 
    </div>
 
    </div>
  
  );
}
