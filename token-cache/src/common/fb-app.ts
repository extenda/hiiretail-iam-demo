import firebase from 'firebase/app';
import 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCY1J3__41nPBbmfaNeNNgO1SwkT4zkLeU',
  authDomain: 'hiidentity-staff.firebaseapp.com',
  databaseURL: 'https://hiidentity-staff.firebaseio.com',
  projectId: 'hiidentity-staff',
  storageBucket: 'hiidentity-staff.appspot.com',
  messagingSenderId: '507969065515',
  appId: '1:507969065515:web:74378c7d42cd5838b7906e',
};

export const fbApp = firebase.initializeApp(firebaseConfig, 'override-app');
