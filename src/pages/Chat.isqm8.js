import { database, ref, push, onChildAdded } from "../public/js/firebase.js";
$w.onReady(function () {
    const messagesRef = ref(database, 'chat/messages');

    $w('#sendButton').onClick(() => {
        const messageText = $w('#messageInput').value;
        if (messageText) {
            push(messagesRef, {
                user: 'Guest', // Здесь можно заменить на имя авторизованного пользователя
                text: messageText,
                timestamp: Date.now()
            });
            $w('#messageInput').value = ''; // Очистка поля ввода
        }
    });

    // Получение новых сообщений
    onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        const messageHtml = `<div>${message.user}: ${message.text}</div>`;
        $w('#chatContainer').html += messageHtml; // Добавление сообщения в контейнер
    });
});
