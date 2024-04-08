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
    const createLink = function(linkText) {
        const link = document.createElement('a');
        link.href = linkUrl; // Путь ссылки
        link.target = '_self'; // Открыть ссылку в текущей вкладке
        link.style.color = 'rgb(255, 0, 255)'; // Фиолетовый цвет
        link.appendChild(document.createTextNode(linkText));
        return link;
    };

    if (message.includes('^')) {
        const lines = message.split('^');
        lines.forEach(line => {
            const lineElement = document.createElement('div');
            const link = createLink(line);
            lineElement.appendChild(link);
            messageElement.appendChild(lineElement);
        });
    } else if (message.includes('*')) {
        const parts = message.split('*');
        const beforeStar = parts[0];
        const linkText = parts[1];
        const afterStar = parts[2];

        const link = createLink(linkText);
        messageElement.appendChild(document.createTextNode(beforeStar));
        messageElement.appendChild(link);
        messageElement.appendChild(document.createTextNode(afterStar));
    } else if (message.includes('$')) { // Добавлено условие для текста, обрамленного символами доллара
        const parts = message.split('$');
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i % 2 === 0) {
                messageElement.appendChild(document.createTextNode(part));
            } else {
                const span = document.createElement('span');
                span.style.backgroundColor = 'purple'; // Закрашиваем текст в фиолетовый цвет
                span.style.textDecoration = 'underline'; // Добавляем подчеркивание
                span.textContent = part; // Добавляем текст
                messageElement.appendChild(span);
            }
        }
    } else {
        const link = createLink(message);
        messageElement.appendChild(link);
    }
} else {
    if (sender === 'bot') {
        if (message.includes('^')) {
            const lines = message.split('^');
            lines.forEach((line, index) => {
                setTimeout(() => {
                    const lineElement = document.createElement('div');
                    lineElement.textContent = line;
                    messageElement.appendChild(lineElement);
                }, index * 50);
            });
        } else if (message.includes('$')) { // Добавлено условие для текста, обрамленного символами доллара
            const parts = message.split('$');
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (i % 2 === 0) {
                    messageElement.appendChild(document.createTextNode(part));
                } else {
                    const span = document.createElement('span');
                    span.style.color = 'rgb(255, 0, 255)'; // Закрашиваем текст в фиолетовый цвет
                    span.style.textDecoration = 'underline'; // Добавляем подчеркивание
                    span.textContent = part; // Добавляем текст
                    messageElement.appendChild(span);
                }
            }
        } else {
            printMessage(sender, message, messageElement);
        }
    } else {
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
                if (i % 2 === 0) {
                    messageElement.appendChild(document.createTextNode(part));
                } else {
                    const span = document.createElement('span');
                    if (linkUrl) {
                        const link = document.createElement('a');
                        link.href = linkUrl;
                        link.onclick = function() {
                            window.location.href = linkUrl;
                            return false;
                        };
                        link.appendChild(document.createTextNode(part.replace(/\*/g, '')));
                        span.appendChild(link);
                    } else {
                        span.style.backgroundColor = 'yellow';
                        span.textContent = part.replace(/\*/g, '');
                    }
                    messageElement.appendChild(span);
                }
            }
        } else {
            messageElement.appendChild(document.createTextNode(message));
        }
    }
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














const buttonAndromeda = document.getElementById('andromeda-button');
  let buttonAndromedaActive = false;



 // Функция для проверки состояния первого запуска Андромеды
function isFirstLaunch() {
    return localStorage.getItem('firstLaunch') !== 'true'; // Если первый запуск, вернуть true
}

// Функция для установки состояния первого запуска Андромеды
function setFirstLaunch() {
    localStorage.setItem('firstLaunch', 'true');
}

// Функция для обновления состояния кнопки изображения и сохранения состояния в локальное хранилище
function toggleAndromeda() {
    if (isFirstLaunch()) {
        const audio = new Audio("https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/andromeda_first_message.mp3");
            audio.play();


        setFirstLaunch(); // Устанавливаем состояние первого запуска
    }
    
    buttonAndromedaActive = true; // Инвертируем состояние кнопки Андромеды
    updateAndromedaButtonState(); // Обновляем состояние кнопки изображения
    startListening();
}


  
  // Функция для обновления внешнего вида кнопки изображения в соответствии с состоянием
  function updateAndromedaButtonState() {
      if (buttonAndromedaActive) {
        buttonAndromeda.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';

      } else {
        buttonAndromeda.style.backgroundColor = 'rgba(128, 0, 128, 0.15)';

      }
  }



      
 // Функция для делания кнопки неактивной
function disableButtonAndromeda() {

    if (buttonAndromeda) {
        buttonAndromeda.disabled = true;
    }
}

// Функция для делания кнопки активной
function enableButtonAndromeda() {

    if (buttonAndromeda) {
        buttonAndromeda.disabled = false;
    }
}


// Добавляем обработчик события наведения мыши на кнопку изображения
buttonAndromeda.addEventListener('mouseenter', function() {
    // Задаем цвет фона кнопке
    buttonAndromeda.style.backgroundColor = 'rgba(128, 0, 128, 0.75)'; // Новый цвет фона кнопки
});

// Добавляем обработчик события увода мыши с кнопки изображения
buttonAndromeda.addEventListener('mouseleave', function() {
    // Возвращаем исходный цвет фона кнопки
    buttonAndromeda.style.backgroundColor = buttonAndromedaActive ? 'rgba(128, 0, 128, 0.5)' : 'rgba(128, 0, 128, 0.15)';
}); 
      
    

      

const qaPairs = [
    { 
        questions: ["Покажи Академию", "Покажи Академи", "Покажи Акодеми", "Покажи Акадими",
        "Открой Академию", "Аткрой Академию", "Открой Академи", "Аткрой Академи",
        "Открой сайт Академии", "Аткрой сайт Академии",
        "Открой сайт Академи", "Аткрой сайт Академи"], 
        answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_academy.mp3", 
        type: "переход по ссылке на Академию" 
    },
    { 
        questions: ["Открой сайт Катрен", "Открой сайт Катренов", "Аткрой сайт Катренов", "Открой сайт Катренов",
        "Аткрой сайт Катрен", "Открой сайт Катрен", "Открой Катрен", "Актрой Катрен", "Открой Катрены", "Аткрой Катрены",
        "Покажи Катрены", "Покажи Катрен"], 
        answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/katrens_opens.mp3", 
        type: "переход по ссылке на Катрены" 
    },
    { 
        questions: ["Открой сайт Доктрин", "Открой сайт Доктрины", "Аткрой сайт Доктрин", "Аткрой сайт Доктрины",
        "Покажи Доктрину", "Покажи Доктрин"], 
        answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_doctrina.mp3", 
        type: "переход по ссылке на Доктрину" 
    },
    { 
        questions: ["Открой сайт Посыла", "Открой сайт Посыло", "Аткрой сайт Посыла", "Аткрой сайт Посыло",
        "Покажи Посыл", "Покажи Посылы"], 
        answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_suit_messages.mp3", 
        type: "переход по ссылке на Посыл" 
    },
    { 
        questions: ["Открой сайт Календаря", "Открой сайт Календар", "Аткрой сайт Календаря", "Аткрой сайт Календар",
        "Открой сайт Колендаря", "Открой сайт Колендаря", "Покажи Колендарь", "Покажи Календарь"], 
        answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_suit.mp3", 
        type: "переход по ссылке на Календарь" 
    }
    // Другие вопросы и ответы
];





// Генерируем ссылку на сегодняшний катрен
const currentDateCatren = new Date();
const dayCatren = currentDateCatren.getDate().toString().padStart(2, '0');
const monthCatren = (currentDateCatren.getMonth() + 1).toString().padStart(2, '0');
const yearCatren = currentDateCatren.getFullYear().toString().slice(-2);
const todayCatrenLink = `https://blagayavest.info/poems/${dayCatren}.${monthCatren}.${yearCatren}.html`;

// Генерируем ссылку на вчерашний катрен
const yesterdayDateCatren = new Date(currentDateCatren);
yesterdayDateCatren.setDate(yesterdayDateCatren.getDate() - 1);
const dayYesterdayCatren = yesterdayDateCatren.getDate().toString().padStart(2, '0');
const monthYesterdayCatren = (yesterdayDateCatren.getMonth() + 1).toString().padStart(2, '0');
const yearYesterdayCatren = yesterdayDateCatren.getFullYear().toString().slice(-2);
const yesterdayCatrenLink = `https://blagayavest.info/poems/${dayYesterdayCatren}.${monthYesterdayCatren}.${yearYesterdayCatren}.html`;

// Функция для форматирования даты в формат "dd.mm.yy"
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
}

// Добавляем ссылку на сегодняшний катрен в массив qaPairs
qaPairs.push({ 
    questions: ["Покажи сегодняшний катрен"], 
    answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_suit.mp3", 
    type: "переход по ссылке на сегодняшний катрен",
    link: todayCatrenLink
});

// Добавляем ссылку на вчерашний катрен в массив qaPairs
qaPairs.push({ 
    questions: ["Покажи вчерашний катрен"], 
    answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_suit.mp3", 
    type: "переход по ссылке на вчерашний катрен",
    link: yesterdayCatrenLink
});

// Добавляем ссылку на инструкцию в массив qaPairs
qaPairs.push({ 
    questions: ["Покажи инструкцию", "Покажи инструкци", "Открой сайт инструкци", "Открой сайт инструкции"], 
    answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_suit.mp3", 
    type: "переход по ссылке на инструкцию",
    link: "https://cosm-future.github.io/a-message-of-light/andromeda.html"
});






// Добавляем команды "Покажи катрен за (дата)" в массив qaPairs
qaPairs.push({ 
    questions: ["Катрен за"], 
    answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_suit.mp3", 
    type: "переход по ссылке на катрен за конкретную дату",
    link: function(userInput) {
        const datePattern = /\b(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{2,4})\b/g;
        const match = datePattern.exec(userInput);
        if (!match) return null; // Если дата не распознана, возвращаем null
        const day = match[1].padStart(2, '0');
        const month = match[2].padStart(2, '0');
        const year = match[3].slice(-2);
        const formattedDate = `${day}.${month}.${year}`;
        const link = `https://blagayavest.info/poems/${formattedDate}.html`;
        
        return link;
    }
});








let recognition;

function startListening() {
    
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.continuous = false;



    recognition.onresult = function(event) {
        const userInput = event.results[event.results.length - 1][0].transcript;
        const qa = getQaByQuestion(userInput);

        if (qa.type === "переход по ссылке на Катрены" || 
        qa.type === "переход по ссылке на Академию" ||
        qa.type === "переход по ссылке на Доктрину" ||
        qa.type === "переход по ссылке на сегодняшний катрен" ||
        qa.type === "переход по ссылке на вчерашний катрен" ||
        qa.type === "переход по ссылке на инструкцию" ||
        qa.type === "переход по ссылке на Посыл" ||
        qa.type === "переход по ссылке на Календарь" ) {
            const audio = new Audio();
            audio.src = qa.answer; // Устанавливаем ссылку как источник аудиофайла 
            audio.play();
            if (qa.type === "переход по ссылке на Катрены") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = "https://blagayavest.info/poems/year.html";
                    });
            } else if (qa.type === "переход по ссылке на Академию") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = "https://akegn.ru/";
                    });
            } else if (qa.type === "переход по ссылке на Доктрину") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = "https://doktrina.info/";
                    });
            } else if (qa.type === "переход по ссылке на сегодняшний катрен" || 
            qa.type === "переход по ссылке на вчерашний катрен" ) {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = qa.link;
                    });
            } else if (qa.type === "переход по ссылке на инструкцию") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = qa.link;
                    });
            } else if (qa.type === "переход по ссылке на Посыл") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = "https://cosm-future.github.io/a-message-of-light/";
                    });
            } else if (qa.type === "переход по ссылке на Календарь") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = "https://cosm-future.github.io/a-message-of-light/calendar.html";
                    });
            }
        }
        

        

        recognition.stop();
        setTimeout(function() {
            buttonAndromedaActive = false; // По истечении 3 секунд выключаем кнопку обратно
            updateAndromedaButtonState();
        }, 4000);
    }

    recognition.start();
    setTimeout(function() {
        buttonAndromedaActive = false; // По истечении 3 секунд выключаем кнопку обратно
        updateAndromedaButtonState();
    }, 4000);
    
}

function getQaByQuestion(question) {
    for (const pair of qaPairs) {
        for (const q of pair.questions) {
            if (question.toLowerCase().includes(q.toLowerCase())) {
                if (pair.getDateLink) {
                    const link = pair.getDateLink(question);
                    if (link) {
                        return { ...pair, link }; // Возвращаем объект с добавленной ссылкой на катрен за указанную дату
                    }
                }
                return pair;
            }
        }
    }
    return { questions: [], answer: "Извините, я не поняла вас.", type: "стандартный" };
}





// Функция для отправки сообщения
function sendsMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message !== '') {
        const chatBox = document.getElementById('chat-box');
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        chatBox.appendChild(newMessage);
        userInput.value = '';
    }
}

// Функция для установки стилей подсказки
function setSuggestionStyles(opacityValue) {
    const suggestion = document.getElementById('suggestion');
    suggestion.style.opacity = opacityValue;
}

// Загрузка данных из файла questions.json
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        // Сохраняем данные из файла в переменную для последующего использования
        const questions = data;

        function suggestText() {
            const userInput = document.getElementById('user-input');
            const userText = userInput.value.toLowerCase();
        
            // Проверяем, является ли введенный текст пустым
            if (userText.trim() === '') {
                document.getElementById('suggestion').textContent = '';
                setSuggestionStyles(0); // Устанавливаем прозрачность 0 (скрываем элемент)
                return; // Выходим из функции, чтобы не продолжать дальше
            }
        
            // Поиск всех подходящих предложений из questions.json
            const allSuggestions = questions.flatMap(question => {
                return question.command.filter(command => command.includes(userText));
            });
        
            // Если есть подходящие предложения, отображаем их как кнопки
if (allSuggestions.length > 0) {
    const suggestionContainer = document.getElementById('suggestion');
    suggestionContainer.innerHTML = ''; // Очищаем контейнер подсказок перед добавлением новых
    allSuggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.classList.add('suggestion-button');
        
        // Проверяем, введен ли уже этот текст пользователем
        const userTextLowercase = userText.toLowerCase();
        const suggestionLowercase = suggestion.toLowerCase();
        const highlightedText = userTextLowercase.length > 0 && suggestionLowercase.startsWith(userTextLowercase) ?
            `<span style="color: white;">${userText}</span><span style="color: darkgrey;">${suggestion.substring(userText.length)}</span>` :
            `<span style="color: darkgrey;">${suggestion}</span>`;
        
        button.innerHTML = highlightedText;

        button.addEventListener('click', function() {
            userInput.value = suggestion + ' ';
            suggestionContainer.textContent = '';
            setSuggestionStyles(0); // Устанавливаем прозрачность 0 (скрываем элемент)
            suggestionContainer.style.display = 'none';
        });
        suggestionContainer.appendChild(button);
    });
    setSuggestionStyles(1); // Устанавливаем прозрачность 1 (показываем элемент)
    suggestionContainer.style.display = 'block';
} else {
    const suggestionContainer = document.getElementById('suggestion');
    document.getElementById('suggestion').textContent = '';
    setSuggestionStyles(0); // Устанавливаем прозрачность 0 (скрываем элемент)
    suggestionContainer.style.display = 'none';
}

        }
        
        


        // Функция для формирования предложенного текста
        function getSuggestedText(userText, suggestion) {
            const userWords = userText.split(' ');
            const lastUserWord = userWords[userWords.length - 1];
            const suggestedText = suggestion.startsWith(lastUserWord) ? suggestion : lastUserWord + suggestion.slice(lastUserWord.length);
            const remainingChars = suggestedText.substring(lastUserWord.length);
            const coloredChars = '<span style="color: white;">' + lastUserWord + '</span>' + '<span style="color: darkgrey;">' + remainingChars + '</span>';
            return coloredChars;
        }

        // Событие при нажатии на клавишу Tab
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        const userInput = document.getElementById('user-input');
        const userText = userInput.value.toLowerCase();
        const suggestionButtons = document.querySelectorAll('.suggestion-button');

        // Проверяем количество найденных подсказок
        if (suggestionButtons.length === 1) {
            // Если найдено только одно совпадение, добавляем его текст
            const suggestion = suggestionButtons[0].textContent;
            const newText = userText + suggestion.substring(userText.length) + ' ';
            userInput.value = newText;
        }

        // Очищаем подсказки и скрываем контейнер
        document.getElementById('suggestion').textContent = '';
        setSuggestionStyles(0); // Устанавливаем прозрачность 0 (скрываем элемент)
    }
});



        // Событие при вводе текста в текстовое поле
        document.getElementById('user-input').addEventListener('input', function() {
            suggestText();
        });

        // Назначение обработчика события клика на кнопку отправки сообщения
        document.querySelector('.send-button').addEventListener('click', function() {
            sendsMessage();
        });

        // Установка стилей подсказки (начальное скрытие)
        setSuggestionStyles(0);
    })
    .catch(error => console.error('Ошибка загрузки файла questions.json:', error));






  
  