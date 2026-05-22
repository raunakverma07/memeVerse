import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// ================= FIREBASE =================

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

// ================= UI ELEMENTS =================

const username = document.getElementById("username");
const postInput = document.getElementById("postInput");
const postBtn = document.getElementById("postBtn");
const feedContainer = document.getElementById("feedContainer");
const charCount = document.getElementById("charCount");

// ================= CHAR COUNT =================

postInput.addEventListener("input", () => {
  charCount.textContent = `${postInput.value.length} / 400`;
});

// ================= POST =================

postBtn.addEventListener("click", async () => {
  const name = username.value.trim() || "Anonymous";
  const message = postInput.value.trim();

  if (!message) {
    alert("Write something first");
    return;
  }

  try {
    await push(ref(db, "posts"), {
      name,
      message,
      time: Date.now()
    });

    postInput.value = "";
  } catch (e) {
    console.log("ERROR:", e);
    alert("Firebase error");
  }
});

// ================= REALTIME FEED =================

onValue(ref(db, "posts"), (snapshot) => {
  feedContainer.innerHTML = "";

  const data = snapshot.val();
  if (!data) return;

  Object.values(data).reverse().forEach((post) => {
    const div = document.createElement("div");
    div.className = "feed-card";

    div.innerHTML = `
      <h4>${post.name}</h4>
      <p>${post.message}</p>
      <small>Just now</small>
    `;

    feedContainer.appendChild(div);
  });
});
