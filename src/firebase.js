
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyCwKjPMoPBvaN4eJNud_KkR_sVLIkDqVaA",
    authDomain: "reels-817a4.firebaseapp.com",
    projectId: "reels-817a4",
    storageBucket: "reels-817a4.appspot.com",
    messagingSenderId: "38689509308",
    appId: "1:38689509308:web:939635a16722a5b179a5b9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();
const firestore=firebase.firestore()
export const database={
  users:firestore.collection("users"),
  posts:firestore.collection("posts"),
  comments:firestore.collection("comments"),
  getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}

export const storage=firebase.storage()