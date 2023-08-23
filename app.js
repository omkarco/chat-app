const socket = io();
let username = '';

document.addEventListener('DOMContentLoaded', () => {
  const usernameContainer = document.querySelector('.username-container');
  const usernameInput = document.getElementById('username-input');
  const usernameButton = document.getElementById('username-button');
  const chatContainer = document.getElementById('chat-container');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');

  usernameButton.addEventListener('click', () => {
    const inputUsername = usernameInput.value.trim();
    if (inputUsername !== '') {
      username = inputUsername;
      usernameContainer.style.display = 'none';
      chatContainer.style.display = 'block';
    }
  });

  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
      socket.emit('chat message', { username, message });
      messageInput.value = '';
    }
  });

  socket.on('chat message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${data.username}: ${data.message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});
