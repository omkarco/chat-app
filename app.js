const socket = io();
let username = '';

const emojiMap = {
  'like': '❤️',
  'hey': '👋',
  'world': '🌎',
  'lol':'😂',
  'congratulations':'🎉',
  'woah':'😮',
  'react':'⚛'
};

document.addEventListener('DOMContentLoaded', () => {
  const usernameContainer = document.querySelector('.username-container');
  const usernameInput = document.getElementById('username-input');
  const usernameButton = document.getElementById('username-button');
  const chatContainer = document.getElementById('chat-container');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');

  // Add event listener for "Enter" key press in the username input
  usernameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      setUsername();
    }
  });

  usernameButton.addEventListener('click', () => {
    setUsername();
  });

  function setUsername() {
    const inputUsername = usernameInput.value.trim();
    if (inputUsername !== '') {
      username = inputUsername;
      usernameContainer.style.display = 'none';
      chatContainer.style.display = 'block';
    }
  }

  // Add event listener for "Enter" key press in the message input
  messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  sendButton.addEventListener('click', () => {
    sendMessage();
  });

  function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
      // Replace words with emojis using the emojiMap
      const modifiedMessage = message.replace(/(like|hey|world|lol|congratulations|woah|react)/g, (match) => emojiMap[match]);
      
      socket.emit('chat message', { username, message: modifiedMessage });
      messageInput.value = '';
    }
  }
  

  function replaceEmojis(message) {
    for (const word in emojiDictionary) {
      if (emojiDictionary.hasOwnProperty(word)) {
        const emoji = emojiDictionary[word];
        const regex = new RegExp(word, 'g'); // Create a regular expression for global search
        console.log(`Replacing ${word} with ${emoji}`);
        message = message.replace(regex, emoji);
      }
    }
    return message;
  }
  

  socket.on('chat message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
  
    // Convert emojis back to Unicode characters
    const displayMessage = data.message.replace(/(:\)|:\(|<3)/g, (match) => emojiMap[match]);
  
    messageElement.textContent = `${data.username}: ${displayMessage}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
})  