import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDs-NW6rIbID9XF5009wb-yMecbo00l7io',
  authDomain: 'pfp-generator-dc1dc.firebaseapp.com',
  projectId: 'pfp-generator-dc1dc',
  storageBucket: 'pfp-generator-dc1dc.appspot.com',
  messagingSenderId: '1066849244601',
  appId: '1:1066849244601:web:de886383dccff1ba63d268',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db };
