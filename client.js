const socket = new WebSocket("ws://localhost:3000"); // Change URL if needed

const messagesContainer = document.getElementById("messagesContainer");
const messageInput = document.getElementById("messageInp");
const sendButton = document.querySelector(".send button");
const nameModal = document.getElementById("nameModal");
const usernameInput = document.getElementById("usernameInput");
const submitUsernameButton = document.getElementById("submitUsername");

let username = "";

submitUsernameButton.addEventListener("click", (event) => {
  event.preventDefault();
  username = usernameInput.value;
  if (username.trim() !== "") {
    nameModal.style.display = "none";
  }
});

sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message.trim() !== "") {
    const fullMessage = `${username}: ${message}`;
    socket.send(fullMessage);
    messageInput.value = "";
  }
});

// ... (previous code) ...

socket.addEventListener("message", async (event) => {
  const blob = await event.data.arrayBuffer();
  const message = new TextDecoder().decode(blob);

  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");

  if (message.startsWith(username)) {
    messageContainer.innerHTML = `<div class="my-message">${message}</div>`;
  } else {
    messageContainer.innerHTML = `<div class="other-message">${message}</div>`;
  }

  messagesContainer.appendChild(messageContainer);

  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// ... (remaining code) ...

// Display the username modal when the page loads
window.addEventListener("load", () => {
  nameModal.style.display = "block";
});

// Close the modal if the close button is clicked
const closeButton = nameModal.querySelector(".close");
closeButton.addEventListener("click", () => {
  nameModal.style.display = "none";
});
