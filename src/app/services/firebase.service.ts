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
  deleteDoc,
  doc,
  addDoc,
} from 'firebase/firestore';
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
export class FirebaseService {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  // analytics = getAnalytics(this.app);
  db = getFirestore(this.app);

  constructor() {
  }

  async getTasks() {
    const tasksCol = collection(this.db, 'tasks');
    const taskSnapshot = await getDocs(tasksCol);
    // const taskList = taskSnapshot.docs.map((doc) => doc.id);
    const taskList = [];
    for (const doc of taskSnapshot.docs) {
      taskList.push({ id: doc.id, data: doc.data() });
    }
    return taskList;
  }

  async addTask(task: any) {
    await addDoc(collection(this.db, 'tasks'), task);
  }

  async updateTask(task: any) {
    await setDoc(doc(this.db, 'tasks', task.id), task.data);
  }

  async deleteTask(taskId: string) {
    await deleteDoc(doc(this.db, 'tasks', taskId));
  }
}
