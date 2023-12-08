/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { getFirestore, collection, getDocs, setDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
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
  providedIn: 'root'
})
export class BirthdayService {

  app = initializeApp(firebaseConfig);
  // analytics = getAnalytics(this.app);
  db = getFirestore(this.app);
  birthdayChanges: Subject<any[]> = new Subject<any[]>();


  constructor() { }

  async getBirthdays() {
    const birthdayCol = collection(this.db, 'birthdays');
    const birthdaySnapshot = await getDocs(birthdayCol);
    // const imageList = imageSnapshot.docs.map((doc) => doc.id);
    const birthdayList = [];
    for (const doc of birthdaySnapshot.docs){
      birthdayList.push({id: doc.id, data: doc.data()});
    }
    return birthdayList;
  }

  async addBirthday(birthday: any) {
    await addDoc(collection(this.db, 'birthdays'), birthday);
    this.birthdayChanges.next(await this.getBirthdays());
  }

  async updateBirthday(birthday: any) {
    await setDoc(doc(this.db, 'birthdays', birthday.id), birthday.data);
    this.birthdayChanges.next(await this.getBirthdays());
  }

  async deleteBirthday(birthdayId: string) {
    await deleteDoc(doc(this.db, 'birthdays', birthdayId));
    this.birthdayChanges.next(await this.getBirthdays());
  }
}
