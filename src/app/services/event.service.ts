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
export class EventService {

  app = initializeApp(firebaseConfig);
  // analytics = getAnalytics(this.app);
  db = getFirestore(this.app);
  eventChanges: Subject<any[]> = new Subject<any[]>();


  constructor() { }

  async getEvents() {
    const eventCol = collection(this.db, 'events');
    const eventSnapshot = await getDocs(eventCol);
    // const imageList = imageSnapshot.docs.map((doc) => doc.id);
    const eventList = [];
    for (const doc of eventSnapshot.docs){
      eventList.push({id: doc.id, data: doc.data()});
    }
    return eventList;
  }

  async addEvent(event: any) {
    await addDoc(collection(this.db, 'events'), event);
    this.eventChanges.next(await this.getEvents());
  }

  async updateEvent(event: any) {
    await setDoc(doc(this.db, 'events', event.id), event.data);
    this.eventChanges.next(await this.getEvents());
  }

  async deleteEvent(eventId: string) {
    await deleteDoc(doc(this.db, 'events', eventId));
    this.eventChanges.next(await this.getEvents());
  }
}
