import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD7UKCW_dgzRHLPZ7ZC_NPVIdrJPLP5vH8",
    authDomain: "meme-1851b.firebaseapp.com",
    projectId: "meme-1851b",
    storageBucket: "meme-1851b.appspot.com",
    messagingSenderId: "193393556959",
    appId: "1:193393556959:web:e2fb6d773fde3ed10e186a",
    measurementId: "G-7DDT6MN2QJ"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };