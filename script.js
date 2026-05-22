import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPnVOiStDOJhbuzecrkuPJSL1VtnFrD94",
  authDomain: "cockroach-janata-party-1e3c7.firebaseapp.com",
  databaseURL: "https://cockroach-janata-party-1e3c7-default-rtdb.firebaseio.com",
  projectId: "cockroach-janata-party-1e3c7",
  storageBucket: "cockroach-janata-party-1e3c7.firebasestorage.app",
  messagingSenderId: "364671902639",
  appId: "1:364671902639:web:54e112e2da31abba10c55a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("🔥 Firebase loaded successfully");

const username = document.getElementById("username");
const postInput = document.getElementById("postInput");
const postBtn = document.getElementById("postBtn");
const feedContainer = document.getElementById("feedContainer");
const charCount = document.getElementById("charCount");

// TEST UI
postBtn.addEventListener("click", async () => {
  console.log("📌 Button clicked");

  const name = username.value || "Anonymous";
  const message = postInput.value;

  if (!message) {
    alert("Empty message");
    return;
  }

  try {
    await push(ref(db, "posts"), {
      name,
      message,
      time: Date.now()
    });

    console.log("✅ Data pushed");

    postInput.value = "";
  } catch (e) {
    console.log("❌ FIREBASE ERROR:", e);
  }
});

onValue(ref(db, "posts"), (snapshot) => {
  console.log("📡 Data received");

  feedContainer.innerHTML = "";

  const data = snapshot.val();

  if (!data) return;

  Object.values(data).reverse().forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = `<h4>${p.name}</h4><p>${p.message}</p>`;
    feedContainer.appendChild(div);
  });
});
