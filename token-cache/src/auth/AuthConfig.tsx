import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

export const app = firebase.initializeApp(firebaseConfig);
