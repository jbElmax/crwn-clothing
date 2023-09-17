import { initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
  } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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

export const addCollectionAndDocuments =async (collectionKey,objectsToAdd)=>{
  const collectionRef = collection(db,collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) =>{
    const docRef = doc(collectionRef,object.title.toLowerCase());
    batch.set(docRef,object)
  });

  await batch.commit();
  console.log('done');
}

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

export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db,'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
    const {title,items} = docSnapshot.data(); 
    acc[title.toLowerCase()] = items;
    return acc;
  },{});

  return categoryMap;
}

export const createAuthUserWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () =>await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);


