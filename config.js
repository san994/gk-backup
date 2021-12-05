import firebase from "firebase"

require("@firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyC3WVTShcUKoUoihosb5YlIlXY5AHiyEBA",
  authDomain: "gk-app-2.firebaseapp.com",
  databaseURL: "https://gk-app-2-default-rtdb.firebaseio.com",
  projectId: "gk-app-2",
  storageBucket: "gk-app-2.appspot.com",
  messagingSenderId: "162557795368",
  appId: "1:162557795368:web:3a3cfb56e095b192c5691d"
};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  

  export default firebase.firestore()