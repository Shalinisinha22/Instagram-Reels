import React, {useState} from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import {storage, database} from '../firebase'


function UploadFile(userData) {
  
    console.log(userData.user.fullName)
const[error,setErr]=useState("")
const[loading,setLoading]=useState(false)
// const[file,setFile]=useState("")

const handleChange=async(file)=>{
  if(file==null){
    setErr("Please select a video first")
    setTimeout(()=>{
      setErr("")
    },2000)
    return;
  }
  if(file.size/(1024*1024)>100){
    setErr("Video size is too large")
    setTimeout(()=>{
      setErr("")
    },2000)
    return;
  }

let uid=uuidv4()
setLoading(true)

  const uploadtask=storage.ref(`/posts/${uid}/${file.name}`).put(file);
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
    setLoading(true)
  
      uploadtask.snapshot.ref.getDownloadURL().then((url)=>{
         console.log(url)
         let obj={
            likes:[],
            comments:[],
            pid:uid,
            purl:url,
            usname:userData.user.fullName,
            uProfile:userData.user.profileUrl,
            userId:userData.user.userId,
            createdAt:database.getTimeStamp()

         }
         database.posts.add(obj).then(async(ref)=>{
            let res = await database.users.doc(userData.user.userId).update({
                postIds : userData.user.postIds!=null ? [...userData.user.postIds,ref.id] : [ref.id]
            })
        }).then(()=>{
            setLoading(false)
        }).catch((err)=>{
            setErr(err)
            setTimeout(()=>{
                setErr('')
            },2000)
            setLoading(false)
        })
    })
          


      
    
  }


}
  return (
    <div style={{marginTop:"5.5rem",marginBottom:"1rem"}}>
        
         {
            error!=="" ? <Alert severity="error">{error}</Alert>
            :
             <>
             <input type="file" accept="video/*" onChange={(e)=>handleChange(e.target.files[0])} id="upload-input" style={{display:"none"}}></input>
             <label htmlFor='upload-input'>
             <Button
                variant="outlined"
                 color="secondary" 
                 disabled={loading}
                 component="span" 
                >
               <MovieIcon></MovieIcon>&nbsp; upload video
             </Button>
             </label>

              {
                loading&&<LinearProgress color="secondary" style={{marginTop:"3%"}} />
              }

             </>
        } 
        
      
    </div>
  )
}

export default UploadFile
