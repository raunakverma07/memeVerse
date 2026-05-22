import { db } from "./firebase.js";

import {
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";


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

  charCount.textContent =
    `${postInput.value.length} / 400`;

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
// POST BUTTON
// ===============================

postBtn.addEventListener("click", async () => {

  const name =
    username.value.trim() || "Anonymous";

  const message =
    postInput.value.trim();

  if(message === ""){

    alert("Write something first.");

    return;
  }

  try{

    const postsRef = ref(db, "posts");

    await push(postsRef, {

      name: name,
      message: message,
      time: Date.now()

    });

    postInput.value = "";

    charCount.textContent = "0 / 400";

  }

  catch(error){

    console.error(error);

    alert("Error posting.");

  }

});


// ===============================
// REALTIME POSTS
// ===============================

const postsRef = ref(db, "posts");

onValue(postsRef, (snapshot) => {

  feedContainer.innerHTML = "";

  const data = snapshot.val();

  if(data){

    const postsArray = Object.values(data);

    postsArray.reverse();

    postsArray.forEach((post) => {

      createPostCard(
        post.name,
        post.message
      );

    });

  }

});