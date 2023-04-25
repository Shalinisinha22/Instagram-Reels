
import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


export default function PrivateRoute({ children }) {
    const {user} = useContext(AuthContext) 

  if (!user) {
    return <Navigate to='/login' />
  }

  return children;
}