import firebase from 'firebase'

let config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyAfBI291SgU9ZCO8OgHxpE7YiPNw3BjMME",
    authDomain: "infamous-pr.firebaseapp.com",
    databaseURL: "https://infamous-pr.firebaseio.com",
    projectId: "infamous-pr",
    storageBucket: "infamous-pr.appspot.com",
    messagingSenderId: "338775613201"
};
let fire = firebase.initializeApp(config);
export default fire;