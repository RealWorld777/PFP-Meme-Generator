import { collection, onSnapshot, getFirestore, addDoc, where, getDoc, orderBy, query, Timestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const downloadsCollection = collection(db, 'downloads');

export const getDownloads = () => {
  const querySnapshot = query(downloadsCollection, where('timestamp', '>=', Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 60 * 24))));
  return getDocs(querySnapshot);
};

export const addDownload = (download: any) => {
  addDoc(downloadsCollection, download);
};

export const getDownloadsCount = async () => {
  const querySnapshot = await getDownloads();
  return querySnapshot.docs.length;
};
