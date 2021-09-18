import firebase from 'firebase/app';
import 'firebase/app-check';
import { environment } from 'src/environments/environment';

// Environment Confi

const app = firebase.initializeApp(environment.firebaseConfig);
const appCheck = app.appCheck()
appCheck.activate('6LcW-3McAAAAAPzQZFhI3e1UgY-W8Foko50eIL8l');