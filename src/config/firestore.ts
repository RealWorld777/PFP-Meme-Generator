import { collection, addDoc, getDocs, orderBy, limit, query } from 'firebase/firestore';
import { db } from './firebase';

const downloadsCollection = collection(db, 'downloads');

export const getDownloads = () => {
  return getDocs(downloadsCollection);
};

export const addDownload = (download: any) => {
  addDoc(downloadsCollection, download);
};

export const getDownloadsCount = async (): Promise<number> => {
  try {
    const querySnapshot = await getDocs(downloadsCollection);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error fetching downloads count:', error);
    throw error;
  }
};

export const getLatestDownloads = async (numberOfDownloads: number): Promise<any[]> => {
  const downloadsCollection = collection(db, 'downloads');

  const q = query(downloadsCollection, orderBy('createdAt', 'desc'), limit(numberOfDownloads));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};
