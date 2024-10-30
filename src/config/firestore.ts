import { collection, addDoc, getDocs } from 'firebase/firestore';
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
    console.error("Error fetching downloads count:", error);
    throw error;
  }
};

export const getLatestDownloads = async (numberOfDownloads: number): Promise<any[]> => {
  const querySnapshot = await getDocs(downloadsCollection);
  return querySnapshot.docs.map((doc) => doc.data()).slice(0, numberOfDownloads);
};
