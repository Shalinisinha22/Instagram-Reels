import React from 'react';
import './App.css';
import Signup from './Components/Signup';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Login from "./Components/Login"
import { AuthProvider } from './Context/AuthContext';
import Feed from './Components/Feed';
import ResetPass from './Components/ResetPass';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';



function App() {



  return (
    <>
 <BrowserRouter>
    <AuthProvider>
    
     <Routes> 
       <Route path="/login" element={<Login></Login>}></Route>
       <Route path="/signup" element={<Signup></Signup>}></Route>
       <Route path="/reset" element={<ResetPass></ResetPass>}></Route> 
       <Route path="/profile/:id" element={ <PrivateRoute><Profile/></PrivateRoute>}></Route>
       <Route path="/" element={ <PrivateRoute><Feed/></PrivateRoute>}></Route>

    </Routes> 
   </AuthProvider>
  
 </BrowserRouter> 
  

 
  </>
  );
}

export default App;
