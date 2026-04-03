// Dados fake de contatos e mensagens
const contacts = [
    {
        id: 1,
        name: "Mãe",
        pic: "assets/profile-pics/mom.jpg",
        lastMessage: "Tudo bem?",
        timestamp: "10:30",
        messages: [
            { sender: "contact", content: "Oi filho, tudo bem?", time: "10:25" },
            { sender: "user", content: "Tudo sim, e você?", time: "10:28" },
            { sender: "contact", content: "Tudo ótimo! Não esquece de pagar a conta de luz.", time: "10:30" }
        ]
    },
    {
        id: 2,
        name: "João",
        pic: "assets/profile-pics/joao.jpg",
        lastMessage: "Vamos jogar hoje?",
        timestamp: "09:15",
        messages: [
            { sender: "contact", content: "E aí, vamos jogar hoje?", time: "09:10" },
            { sender: "user", content: "Claro! Às 20h?", time: "09:12" },
            { sender: "contact", content: "Beleza!", time: "09:15" }
        ]
    },
    {
        id: 3,
        name: "Maria",
        pic: "assets/profile-pics/maria.jpg",
        lastMessage: "📷 Foto",
        timestamp: "Ontem",
        messages: [
            { sender: "contact", content: "📷 Foto", time: "18:45", type: "image" },
            { sender: "user", content: "Que linda!", time: "18:47" }
        ]
    }
];

const statuses = [
    { name: "João", pic: "assets/profile-pics/joao.jpg", time: "Há 5 minutos" },
    { name: "Maria", pic: "assets/profile-pics/maria.jpg", time: "Há 2 horas" }
];

// Elementos do DOM
const chatsContainer = document.getElementById('chats');
const chatMessagesContainer = document.getElementById('chat-messages');
const chatArea = document.getElementById('chat-area');
const statusPanel = document.getElementById('status-panel');
const messageInput = document.getElementById('message-input');
const contactName = document.getElementById('contact-name');
const contactStatus = document.getElementById('contact-status');
const contactPic = document.getElementById('contact-pic');
const statusList = document.getElementById('status-list');

// Carregar contatos
function loadContacts() {
    chatsContainer.innerHTML = '';
    contacts.forEach(contact => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.innerHTML = `
            <img src="${contact.pic}" class="profile-pic">
            <div class="chat-info">
                <div class="chat-name">${contact.name}</div>
                <div class="last-message">${contact.lastMessage}</div>
            </div>
            <div class="timestamp">${contact.timestamp}</div>
        `;
        chatItem.addEventListener('click', () => openChat(contact));
        chatsContainer.appendChild(chatItem);
    });
}

// Abrir conversa
function openChat(contact) {
    contactName.textContent = contact.name;
    contactStatus.textContent = "online";
    contactPic.src = contact.pic;

    chatMessagesContainer.innerHTML = '';
    contact.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender === 'user' ? 'sent' : 'received'}`;

        if (msg.type === 'image') {
            messageDiv.innerHTML = `
                <img src="${msg.content}" style="max-width: 200px; border-radius: 5px;">
                <div class="timestamp">${msg.time}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                ${msg.content}
                <div class="timestamp">${msg.time}</div>
            `;
        }

        chatMessagesContainer.appendChild(messageDiv);
    });

    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// Carregar status
function loadStatuses() {
    statusList.innerHTML = '';
    statuses.forEach(status => {
        const statusItem = document.createElement('div');
        statusItem.className = 'status-item';
        statusItem.innerHTML = `
            <img src="${status.pic}" class="status-pic">
            <div>
                <div class="chat-name">${status.name}</div>
                <div class="last-message">${status.time}</div>
            </div>
        `;
        statusList.appendChild(statusItem);
    });
}

// Enviar mensagem
function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;

    const activeContact = contacts.find(contact => contact.name === contactName.textContent);
    if (!activeContact) return;

    const newMessage = {
        sender: 'user',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    activeContact.messages.push(newMessage);
    activeContact.lastMessage = message;
    activeContact.timestamp = newMessage.time;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.innerHTML = `
        ${message}
        <div class="timestamp">${newMessage.time}</div>
    `;

    chatMessagesContainer.appendChild(messageDiv);
    messageInput.value = '';
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    // Simular resposta automática após 2 segundos
    setTimeout(() => {
        const reply = {
            sender: 'contact',
            content: "Recebi sua mensagem!",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        activeContact.messages.push(reply);
        activeContact.lastMessage = reply.content;
        activeContact.timestamp = reply.time;

        const replyDiv = document.createElement('div');
        replyDiv.className = 'message received';
        replyDiv.innerHTML = `
            ${reply.content}
            <div class="timestamp">${reply.time}</div>
        `;

        chatMessagesContainer.appendChild(replyDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }, 2000);

    loadContacts(); // Atualizar lista de contatos
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    loadStatuses();

    // Enviar mensagem ao pressionar Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Alternar entre chats e status
    document.querySelector('.fa-comment-dots').addEventListener('click', () => {
        chatArea.classList.remove('hidden');
        statusPanel.classList.add('hidden');
    });

    document.querySelector('.fa-circle-notch').addEventListener('click', () => {
        chatArea.classList.add('hidden');
        statusPanel.classList.remove('hidden');
    });
});
