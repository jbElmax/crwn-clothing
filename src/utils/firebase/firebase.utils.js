import { initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
  } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
}from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBAPEzdGL4PvbxSOj-zuiPDjxo4wp974xc",
  authDomain: "crwn-clothing-db-3fe7c.firebaseapp.com",
  projectId: "crwn-clothing-db-3fe7c",
  storageBucket: "crwn-clothing-db-3fe7c.appspot.com",
  messagingSenderId: "915083460781",
  appId: "1:915083460781:web:a671eff4f3bf5c78d0c624"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
  ) =>{
  const userDocRef = doc(db,'users',userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){//create the doc
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating user',error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password);
}