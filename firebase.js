import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";


// ===============================
// FIREBASE CONFIG
// ===============================

const firebaseConfig = {

  apiKey: "AIzaSyCPnVOiStDOJhbuzecrkuPJSL1VtnFrD94",

  authDomain: "cockroach-janata-party-1e3c7.firebaseapp.com",

  databaseURL: "https://cockroach-janata-party-1e3c7-default-rtdb.firebaseio.com",

  projectId: "cockroach-janata-party-1e3c7",

  storageBucket: "cockroach-janata-party-1e3c7.firebasestorage.app",

  messagingSenderId: "364671902639",

  appId: "1:364671902639:web:54e112e2da31abba10c55a"

};


// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ===============================
// EXPORT DATABASE
// ===============================

export { db };