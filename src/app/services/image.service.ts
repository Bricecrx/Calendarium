/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { getFirestore, collection, getDocs, setDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyALBsheNKj3mUTBleA_I_N1H0aIrUSbxnw',
  authDomain: 'romane-organizer.firebaseapp.com',
  projectId: 'romane-organizer',
  storageBucket: 'romane-organizer.appspot.com',
  messagingSenderId: '443306290790',
  appId: '1:443306290790:web:b726685dddd05f56a3c7a7',
  measurementId: 'G-H2Y9TC5M6V',
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  app = initializeApp(firebaseConfig);
  // analytics = getAnalytics(this.app);
  db = getFirestore(this.app);

  constructor() { }

  async getImages() {
    const imagesCol = collection(this.db, 'images');
    const imageSnapshot = await getDocs(imagesCol);
    // const imageList = imageSnapshot.docs.map((doc) => doc.id);
    const imageList = [];
    for (const doc of imageSnapshot.docs){
      imageList.push({id: doc.id, data: doc.data()});
    }
    return imageList;
  }

  async addImage(image: any) {
    await addDoc(collection(this.db, 'images'), image);
  }

  async updateImage(image: any) {
    await setDoc(doc(this.db, 'images', image.id), image.data);
  }

  async deleteImage(imageId: string) {
    await deleteDoc(doc(this.db, 'images', imageId));
  }
}
