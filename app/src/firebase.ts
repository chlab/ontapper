import { initializeApp } from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyAC9hTc13Jesfn6wXeuP5-tjDLnhXkefAg",
    authDomain: "ontapper.firebaseapp.com",
    databaseURL: "https://ontapper-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ontapper",
    storageBucket: "ontapper.appspot.com",
    messagingSenderId: "715913983789",
    appId: "1:715913983789:web:58a987193e2deb749e45a4"
};
export const app = initializeApp(firebaseConfig);
