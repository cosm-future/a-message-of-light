const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
let botResponseAppended = true; // Флаг, чтобы отслеживать, был ли уже добавлен ответ от бота


// Добавляем обработчик событий для поля ввода
userInput.addEventListener('keydown', function(event) {
    // Проверяем, нажата ли клавиша Enter и одновременно удерживается ли клавиша Shift
    if (event.ctrlKey && event.key === 'Enter') {
        // Отменяем стандартное поведение поля ввода, чтобы избежать перехода на новую строку
        event.preventDefault();
        // Вызываем функцию отправки сообщения
        sendMessage();
    }
});

// Функция для отправки сообщения
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    userInput.value = '';

    // Отправляем сообщение пользователя
    appendMessage('user', userMessage);

    // Получаем ответ от бота на основе введенного сообщения
    setTimeout(() => {
        getBotResponse(userMessage);
    }, 1000);
}

// Функция для получения ответа от бота
function getBotResponse(userMessage) {
    loadJSON(function(data) {
        for (let i = 0; i < data.length; i++) {
            const question = data[i];
            // Проверяем, совпадает ли введенное сообщение с вопросом из JSON файла
            if (question.command.includes(userMessage.toLowerCase())) {
                // Выбираем случайный ответ из массива возможных ответов
                const randomIndex = Math.floor(Math.random() * question.answers.length);
                const botResponse = question.answers[randomIndex];

                // Если есть ссылка в ответе, добавляем ее
                if (question.link) {
                    const linkUrl = question.link;
                    appendMessage('bot', botResponse, linkUrl);
                } else {
                    // Вызываем функцию appendMessage без анимации только для ответов от бота
                    appendMessage('bot', botResponse, null, false);
                }
                return;
            }
        }
        // Если вопрос не найден, выводим стандартный ответ
        const defaultResponse = "Извините, я не могу ответить на этот вопрос.";
        appendMessage('bot', defaultResponse);
    });
}






// Функция для загрузки JSON файла
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'questions.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == 200) {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

// Функция для добавления сообщения в окно чата
function appendMessage(sender, message, linkUrl = null, animateTyping = true) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(`${sender}-message`);

    // Создаем блок для имени отправителя и времени отправки сообщения
    const infoBlock = document.createElement('div');
    infoBlock.classList.add('info-block');

    // Получаем текущее время в формате чч:мм:сс
    const currentDate = new Date();
    const timeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Формируем текст для имени отправителя и времени отправки сообщения
    let senderText = '';
    let senderColor = '';
    if (sender === 'user') {
        senderText = 'Вы';
        senderColor = 'rgb(186, 134, 255)';
    } else if (sender === 'bot') {
        senderText = 'Андромеда';
        senderColor = 'rgb(186, 134, 255)';
    }
    const infoText = `<span style="color: ${senderColor};">${senderText}</span>  <span style="color: grey;">${timeString}</span>`;

    // Устанавливаем HTML код в блок информации
    infoBlock.innerHTML = infoText;

    // Устанавливаем информационный блок и текст сообщения в основной блок сообщения
    messageElement.appendChild(infoBlock);

    // Добавляем сообщение в окно чата
    chatBox.appendChild(messageElement);

    // Прокрутка до нижней части окна чата
    chatBox.scrollTop = chatBox.scrollHeight;

    // Добавляем класс visible через 0.5 секунды после добавления сообщения
    setTimeout(() => {
        messageElement.classList.add('visible');
    }, 150);

   // Если передан URL ссылки, добавляем ссылку в сообщение
if (linkUrl) {
    // Проверяем, содержит ли сообщение символ "^" для разделения на строки
    if (message.includes('^')) {
        const lines = message.split('^'); // Разделяем текст на строки по символу "^"
        lines.forEach(line => {
            const lineElement = document.createElement('div'); // Создаем элемент для каждой строки
            const link = document.createElement('a'); // Создаем ссылку
            link.href = linkUrl; // Устанавливаем URL ссылки
            link.target = '_blank'; // Устанавливаем атрибут target для открытия в новой вкладке
            link.style.color = 'rgb(255, 0, 255)'; // Устанавливаем цвет ссылки

            // Добавляем текст ссылки в элемент ссылки
            link.appendChild(document.createTextNode(line));
            
            // Добавляем ссылку в сообщение
            lineElement.appendChild(link);
            messageElement.appendChild(lineElement);
        });
    } else if (message.includes('*')) {
        const parts = message.split('*');
        const beforeStar = parts[0];
        const linkText = parts[1]; // Текст ссылки
        const afterStar = parts[2];

        const link = document.createElement('a');
        link.href = linkUrl; // Путь ссылки
        link.target = '_blank'; // Открыть ссылку в новой вкладке
        link.style.color = 'rgb(255, 0, 255)'; // Фиолетовый цвет

        // Добавляем текст ссылки в сообщение
        link.appendChild(document.createTextNode(linkText));
        messageElement.appendChild(document.createTextNode(beforeStar));
        messageElement.appendChild(link);

        // Нет вызова printMessage(), потому что это не текстовое сообщение от бота
        messageElement.appendChild(document.createTextNode(afterStar));
    } else {
        // Если символы "^" и "*" отсутствуют, просто добавляем текст сообщения как ссылку
        const link = document.createElement('a'); // Создаем ссылку
        link.href = linkUrl; // Устанавливаем URL ссылки
        link.target = '_blank'; // Устанавливаем атрибут target для открытия в новой вкладке
        link.style.color = 'rgb(255, 0, 255)'; // Устанавливаем цвет ссылки

        // Добавляем текст сообщения в элемент ссылки
        link.appendChild(document.createTextNode(message));
        
        // Добавляем ссылку в сообщение
        messageElement.appendChild(link);
    }
} else {
    // Если ссылка не передана, просто добавляем текст сообщения
    if (sender === 'bot') {
        // Если это сообщение от бота, и у него нет ссылки, вызываем плавное напечатывание
        if (message.includes('^')) {
            const lines = message.split('^'); // Разделяем текст на строки по символу "^"
            lines.forEach((line, index) => {
                setTimeout(() => {
                    const lineElement = document.createElement('div'); // Создаем элемент для строки
                    lineElement.textContent = line; // Устанавливаем текст строки
                    messageElement.appendChild(lineElement); // Добавляем элемент в сообщение
                }, index * 50); // Задержка для эффекта плавного напечатывания
            });
        } else {
            // Если символ "^" отсутствует, вызываем плавное напечатывание для всего текста сообщения
            printMessage(sender, message, messageElement);
        }
    } else {
        // Добавляем текст сообщения в элемент сообщения
        // В случае, если символ "^" или "*" используется, разбиваем текст на строки и добавляем их по отдельности
        if (message.includes('^')) {
            const lines = message.split('^');
            lines.forEach(line => {
                const lineElement = document.createElement('div');
                lineElement.textContent = line;
                messageElement.appendChild(lineElement);
            });
        } else if (message.includes('*')) {
            const parts = message.split('*');
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (i % 2 === 0) { // Четные части будут обычным текстом
                    messageElement.appendChild(document.createTextNode(part));
                } else { // Нечетные части будут закрашены
                    const span = document.createElement('span');
                    if (linkUrl) { // Если есть ссылка, то создаем ссылку
                        const link = document.createElement('a');
                        link.href = linkUrl;
                        link.target = '_blank';
                        link.appendChild(document.createTextNode(part.replace(/\*/g, '')));
                        span.appendChild(link);
                    } else { // Если нет ссылки, просто закрашиваем текст
                        span.style.backgroundColor = 'yellow';
                        span.textContent = part.replace(/\*/g, '');
                    }
                    messageElement.appendChild(span);
                }
            }
        } else {
            messageElement.appendChild(document.createTextNode(message));
        }
    };
    
        
        
        
        
        

        
        
        
        
        
        
        
        
        
        
        
        
    }
}


    
    












function printMessage(sender, message, messageElement) {
    return new Promise(resolve => {
        const delay = 35; // Задержка между выводом каждого символа (в миллисекундах)
        let index = 0;

        function printNextCharacter() {
            if (index < message.length) {
                messageElement.appendChild(document.createTextNode(message[index]));
                index++;
                setTimeout(printNextCharacter, delay);
            } else {
                // По завершении печати вызываем функцию resolve для Promise
                resolve();
            }
        }

        printNextCharacter();
    });
}

// Загрузка JSON файла при загрузке страницы
window.onload = function() {
    loadJSON(function(data) {
        // JSON файл успешно загружен, вы можете начать использовать его здесь
    });
};











// Создаем элемент кнопки
const hamburgerButton = document.createElement('button');
hamburgerButton.id = "hamburger-button";
hamburgerButton.classList.add('hamburger-button'); // Добавляем класс для стилей кнопки

// Устанавливаем символ иконки кнопки
const iconSymbol = document.createTextNode('≡ ');
hamburgerButton.appendChild(iconSymbol);



// Добавляем кнопку в тело документа
document.body.appendChild(hamburgerButton);





let isHamburgerActive = false;

// Функция для обновления состояния кнопки "Гамбургер" и создания/удаления контейнера "меню на ресурсы"
function toggleHamburger() {
    isHamburgerActive = !isHamburgerActive; // Инвертируем состояние кнопки "Гамбургер"
    updateHamburgerButtonState(); // Обновляем состояние кнопки "Гамбургер"
    
    // Получаем ссылку на контейнер "меню на ресурсы"
    const menuContainer = document.getElementById('menu-container');

    // Если кнопка "Гамбургер" активна, создаем контейнер "меню на ресурсы" и добавляем его в тело документа
    if (isHamburgerActive) {
        const newMenuContainer = document.createElement('div');
        newMenuContainer.id = 'menu-container';
        newMenuContainer.classList.add('menu-container');
        newMenuContainer.style.opacity = '0';

        // Создаем заголовок "Ссылки на основные ресурсы"
        const title1 = document.createElement('h2');
        title1.textContent = 'Ссылки на основные ресурсы:';
        title1.classList.add('h2White');
        newMenuContainer.appendChild(title1);

        // Создаем кнопку Академия с ссылкой
        const linkButton1 = document.createElement('button');
        linkButton1.id = 'resource-link-button1';
        linkButton1.classList.add('encryptText');
        linkButton1.innerHTML = 'Академия'; // Текст кнопки
        linkButton1.addEventListener('click', function() {
            // Открываем ссылку в новой вкладке
            window.open('https://akegn.ru/', '_blank');
        });
        newMenuContainer.appendChild(linkButton1);

        // Создаем кнопку Доктрина с ссылкой
        const linkButton2 = document.createElement('button');
        linkButton2.id = 'resource-link-button2';
        linkButton2.classList.add('encryptText');
        linkButton2.innerHTML = 'Доктрина'; // Текст кнопки
        linkButton2.addEventListener('click', function() {
            // Открываем ссылку в новой вкладке
            window.open('https://doktrina.info/?yclid=3755516742685425663', '_blank');
        });
        newMenuContainer.appendChild(linkButton2);

        // Создаем кнопку Благая весть с ссылкой
        const linkButton3 = document.createElement('button');
        linkButton3.id = 'resource-link-button3';
        linkButton3.classList.add('encryptText');
        linkButton3.innerHTML = 'Благая Весть'; // Текст кнопки
        linkButton3.addEventListener('click', function() {
            // Открываем ссылку в новой вкладке
            window.open('https://blagayavest.info/', '_blank');
        });
        newMenuContainer.appendChild(linkButton3);


        // Создаем заголовок "Прочее"
        const title2 = document.createElement('h2');
        title2.textContent = 'Прочее:';
        title2.classList.add('h2White');
        newMenuContainer.appendChild(title2);


        // Создаем кнопку Справка с ссылкой
        const linkButton7 = document.createElement('button');
        linkButton7.id = 'resource-link-button7';
        linkButton7.classList.add('encryptText');
        linkButton7.innerHTML = 'Справка'; // Текст кнопки
        linkButton7.addEventListener('click', function() {
            // Замените на фактическую ссылку
            window.location.href = "https://cosm-future.github.io/a-message-of-light/andromeda.html";
        });
        newMenuContainer.appendChild(linkButton7);



        // Создаем кнопку Календарь с ссылкой
        const linkButton4 = document.createElement('button');
        linkButton4.id = 'resource-link-button4';
        linkButton4.classList.add('encryptText');
        linkButton4.innerHTML = 'Календарь'; // Текст кнопки
        linkButton4.addEventListener('click', function() {
            // Замените на фактическую ссылку
            window.location.href = "https://cosm-future.github.io/a-message-of-light/calendar.html";
        });
        newMenuContainer.appendChild(linkButton4);

        // Создаем кнопку Посылы с ссылкой
        const linkButton5 = document.createElement('button');
        linkButton5.id = 'resource-link-button5';
        linkButton5.classList.add('encryptText');
        linkButton5.innerHTML = 'Посылы'; // Текст кнопки
        linkButton5.addEventListener('click', function() {
            // Замените на фактическую ссылку
            window.location.href = "https://cosm-future.github.io/a-message-of-light/";
        });
        newMenuContainer.appendChild(linkButton5);

        // Создаем кнопку Кроссворды с ссылкой
        const linkButton6 = document.createElement('button');
        linkButton6.id = 'resource-link-button6';
        linkButton6.classList.add('encryptText');
        linkButton6.innerHTML = 'Кроссворды'; // Текст кнопки
        linkButton6.addEventListener('click', function() {
            // Открываем ссылку в новой вкладке
            window.open('https://creators-crossword-puzzle12.glitch.me/', '_blank');
        });
        newMenuContainer.appendChild(linkButton6);

        
        
        
        

        // Добавляем контейнер в тело документа с задержкой в 0.3 секунды
setTimeout(() => {
    
    document.body.appendChild(newMenuContainer);
    newMenuContainer.style.opacity = '1';
    
}, 300); // Задержка в миллисекундах (0.3 секунды = 300 миллисекунд)


    } else {
        // Если кнопка "Гамбургер" неактивна и контейнер существует, удаляем его из документа
        if (menuContainer) {
            menuContainer.parentNode.removeChild(menuContainer);
        }
    }
}




// Функция для обновления внешнего вида кнопки "Гамбургер" в соответствии с состоянием
function updateHamburgerButtonState() {
    const hamburgerButton = document.getElementById('hamburger-button');
    if (!hamburgerButton) return;

    if (isHamburgerActive) {
        hamburgerButton.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
        
    } else {
        hamburgerButton.style.backgroundColor = 'rgba(128, 0, 128, 0.15)';
        
    }
}



// Функция для делания кнопки "Гамбургер" неактивной
function disableHamburgerButton() {
    if (hamburgerButton) {
        hamburgerButton.disabled = true;
    }
}

// Функция для делания кнопки "Гамбургер" активной
function enableHamburgerButton() {
    if (hamburgerButton) {
        hamburgerButton.disabled = false;
    }
}




// Добавляем обработчик события наведения мыши на кнопку "Гамбургер"
hamburgerButton.addEventListener('mouseenter', function() {
        hamburgerButton.style.backgroundColor = 'rgba(128, 0, 128, 0.75)';

});

// Добавляем обработчик события увода мыши с кнопки изображения
hamburgerButton.addEventListener('mouseleave', function() {
    // Возвращаем исходный цвет фона кнопки
    hamburgerButton.style.backgroundColor = isHamburgerActive ? 'rgba(128, 0, 128, 0.5)' : 'rgba(128, 0, 128, 0.15)';
});


// Добавляем обработчик события клика на кнопку "Гамбургер"
if (hamburgerButton) {
    hamburgerButton.addEventListener('click', function() {
        toggleHamburger();
    });
}