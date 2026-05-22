// ===============================
// IMPORTS (FIREBASE MODULES)
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
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
// INIT FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// ===============================
// ELEMENTS
// ===============================

const username = document.getElementById("username");
const postInput = document.getElementById("postInput");
const postBtn = document.getElementById("postBtn");
const feedContainer = document.getElementById("feedContainer");
const charCount = document.getElementById("charCount");


// ===============================
// CHARACTER COUNT
// ===============================

postInput.addEventListener("input", () => {
  charCount.textContent = `${postInput.value.length} / 400`;
});


// ===============================
// CREATE POST CARD
// ===============================

function createPostCard(name, message) {
  const card = document.createElement("div");
  card.classList.add("feed-card");

  card.innerHTML = `
    <div class="feed-top">
      <div>
        <h4>${name}</h4>
        <span>Just now</span>
      </div>
      <div class="tag">Public</div>
    </div>

    <p class="feed-text">
      ${message}
    </p>

    <div class="reaction-bar">
      <button>😂</button>
      <button>🔥</button>
      <button>💀</button>
      <button>👍</button>
    </div>
  `;

  feedContainer.prepend(card);
}


// ===============================
// POST BUTTON CLICK
// ===============================

postBtn.addEventListener("click", async () => {

  const name = username.value.trim() || "Anonymous";
  const message = postInput.value.trim();

  if (message === "") {
    alert("Write something first.");
    return;
  }

  try {
    const postsRef = ref(db, "posts");

    await push(postsRef, {
      name: name,
      message: message,
      time: Date.now()
    });

    postInput.value = "";
    charCount.textContent = "0 / 400";

  } catch (error) {
    console.error("WRITE ERROR:", error);
    alert("Error posting. Check console.");
  }
});


// ===============================
// REALTIME FEED
// ===============================

const postsRef = ref(db, "posts");

onValue(postsRef, (snapshot) => {

  feedContainer.innerHTML = "";

  const data = snapshot.val();

  if (data) {
    const postsArray = Object.values(data);

    postsArray.reverse();

    postsArray.forEach((post) => {
      createPostCard(post.name, post.message);
    });
  }
});
