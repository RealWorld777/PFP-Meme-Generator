import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDXJ5-mHMMfisr6k_9ghnxhwKUt8AhpZeU",
  authDomain: "image-27e04.firebaseapp.com",
  projectId: "image-27e04",
  storageBucket: "image-27e04.appspot.com",
  messagingSenderId: "933418615350",
  appId: "1:933418615350:web:8b5b8ac538afedae080e97",
  measurementId: "G-2ZZF7CCR1Y"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };