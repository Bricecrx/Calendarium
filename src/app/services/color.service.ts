/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  // deleteDoc,
  doc,
  // addDoc,
} from 'firebase/firestore';
import { Subject } from 'rxjs';
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
  providedIn: 'root',
})
export class ColorService {
  app = initializeApp(firebaseConfig);
  // analytics = getAnalytics(this.app);
  db = getFirestore(this.app);
  // colorChanges: Subject<any[]> = new Subject<any[]>();
  backgroundColorChanges: Subject<string> = new Subject<string>();

  constructor() {}

  async getColors() {
    const colorCol = collection(this.db, 'colors');
    const colorSnapshot = await getDocs(colorCol);
    const colorList = [];
    for (const doc of colorSnapshot.docs) {
      colorList.push({ id: doc.id, data: doc.data() });
    }
    this.backgroundColorChanges.next(colorList.filter((el) => el.id === 'background-color')[0].data.color);
    return colorList;
  }

  // async addColor(color: any) {
  //   await addDoc(collection(this.db, 'colors'), color);
  // }

  async updateColor(color: any) {
    await setDoc(doc(this.db, 'colors', color.id), color.data);
    if (color.id === 'background-color') {
      this.backgroundColorChanges.next(color.data.color);
    }
  }

  // async deleteColor(colorId: string) {
  //   await deleteDoc(doc(this.db, 'colors', colorId));
  // }
}
