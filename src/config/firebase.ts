// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, u } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA-ZC8i4xJdsfFkpKejc312mrzIXCqSfoA',
  authDomain: 'learnfirebase-91fd3.firebaseapp.com',
  projectId: 'learnfirebase-91fd3',
  storageBucket: 'learnfirebase-91fd3.appspot.com',
  messagingSenderId: '990369197886',
  appId: '1:990369197886:web:c4a4d4b85a506c420d466f',
  measurementId: 'G-QV3FT9QMNP'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)
