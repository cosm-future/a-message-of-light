
 // Клиентский ID вашего счетчика
 const clientId = 'bb4b1fa766604b568174af4df7b5f120';

// Функция для получения количества посетителей через API Яндекс.Метрики
function fetchVisitors() {
    fetch(`https://api-metrika.yandex.net/stat/v1/data/bytime?metrics=ym:s:users&dimensions=ym:s:date&date1=today&date2=today&ids=${clientId}`)
      .then(response => response.json())
      .then(data => {
        // Получаем количество посетителей за последнюю минуту
        const visitors = data.totals[0];
        // Обновляем отображение счетчика
        document.getElementById('visitorCounter').textContent = `Current visitors: ${visitors}`;
      })
      // .catch(error => console.error('Error fetching data:', error));
  }

  // Вызываем функцию для получения данных о посетителях каждую минуту
  fetchVisitors();
  setInterval(fetchVisitors, 60000); // Обновляем каждую минуту



  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = 'message_love.ico';
  document.head.appendChild(favicon);








// Объявляем переменные для времени до события
let hoursLeft, minutesLeft, secondsLeft;

let eventType = "";
let isIntervalActive;
let isButtonClicked = false; // Флаг, указывающий, был ли уже выполнен клик по кнопке



let quatrains;

fetch('quatrains.json')
  .then(response => response.json())
  .then(data => {
    quatrains = data;
    // Вызываем функцию displayRandomQuatrain после успешного чтения файла JSON
    displayRandomQuatrain();
  })
  // .catch(error => console.error('Ошибка при чтении файла:', error));

// Функция для выбора случайного четверостишия
function getRandomQuatrain() {
  const randomIndex = Math.floor(Math.random() * quatrains.length);
  return quatrains[randomIndex];
}

// Функция для отображения случайного четверостишия на сайте
function displayRandomQuatrain() {
  // Проверяем, есть ли данные в переменной quatrains
  if (!quatrains || quatrains.length === 0) {
    // console.error('Отсутствуют данные в переменной quatrains');
    return;
  }

  const quatrainElement = document.querySelector('.quatrain');
  const randomQuatrain = getRandomQuatrain();

  const quatrainText = randomQuatrain.text.map(line => `<p>${line}</p>`).join('');

  // Проверяем, есть ли звездочка в конце строки названия катрена
  let titleLines = randomQuatrain.title.split('*');
  let quatrainInfo = '';
  if (titleLines.length > 1) {
    // Если название катрена состоит из двух строк или более, применяем line-height: 0.4; для каждой строки
    quatrainInfo = `<p style="line-height: 1.2;">${titleLines.join('<br>')} [Катрен от ${randomQuatrain.date}]</p>`;
  } else {
    // Иначе просто добавляем название катрена
    quatrainInfo = `<p>${randomQuatrain.title} [Катрен от ${randomQuatrain.date}]</p>`;
  }

  // Создаем элемент <a> и добавляем в него информацию о четверостишии
  const quatrainLink = document.createElement('a');
  quatrainLink.href = randomQuatrain.link; // Устанавливаем ссылку
  quatrainLink.target = "_blank"; // Открываем в новой вкладке
  quatrainLink.classList.add('quatrain-link'); // Добавляем класс
  quatrainLink.innerHTML = quatrainInfo + "<br>" + quatrainText;

  // Очищаем содержимое контейнера и добавляем в него четверостишие внутри элемента <a>
  quatrainElement.innerHTML = '';
  quatrainElement.appendChild(quatrainLink);
}




// Установка значения атрибута src для элемента с id="audioSource"
const audioSource = document.getElementById('audioSource');

let name_of_the_song = ''; // название песни
let songwriter = ''; // автор песни
let song_link = ''; // ссылка песни
let jsonFileRandomMusic; // Объявляем переменную глобально по ссылке на список музыки.


// Получаем ссылки на элементы заголовка песни и имени исполнителя
const songTitleElement = document.getElementById('songTitle');
const artistNameElement = document.getElementById('artistName');

function getRandomSong() {
    
        
        fetch(jsonFileRandomMusic)
        .then(response => response.json())
        .then(data => {
            // Получение случайного объекта из массива
            const randomSong = data[Math.floor(Math.random() * data.length)];

            // Присваивание значений переменным
            name_of_the_song = randomSong.название;
            songwriter = randomSong.автор;
            song_link = randomSong.ссылка;

            audioSource.src = song_link;
            audioPlayer.load();

            // Подставляем значения переменных в текст элементов
            songTitleElement.textContent = name_of_the_song;
            artistNameElement.textContent = songwriter;

            // Здесь можно выполнить другие действия с полученными данными
        })
   

    
        
}



// Теперь мы можем вызывать функцию getRandomSong() в любом месте кода для получения случайной песни






let notificationShown = false;

function handleNotifications() {
    // Проверяем поддержку уведомлений в браузере
    if ("Notification" in window) {
        // Проверяем, показывали ли уже запрос на разрешение уведомлений
        if (!localStorage.getItem('notificationPermissionRequested')) {
            // Запрашиваем разрешение на отправку уведомлений
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    // Устанавливаем флаг о том, что запрос был показан
                    localStorage.setItem('notificationPermissionRequested', true);
                }
            });
        }

        
    }
}












let vibrationPlayed = false;
let lineElement; // Переменная для хранения ссылки на элемент линии

// Получаем ссылку на элемент с классом "container"
var container = document.getElementById('container');


// Получаем ссылку на изображение
var imageElement = document.getElementById('dynamic-image');


// Глобальная переменная для хранения ссылки на аудиоэлемент
let audioPlayer = document.getElementById('audioPlayer');

// Функция для запуска аудиоплеера
function playAudio() {
  
  if (audioPlayer.paused) {
    audioPlayer.play();
  }
}

// Функция для остановки аудиоплеера
function pauseAudio() {
  
  if (!audioPlayer.paused) {
    audioPlayer.pause();
  }
}




// Определение переменных состояния кнопки и элементов кнопки
let isAudioActive = false;
const audioButton = document.getElementById('audioButton');
const audioIcon = document.getElementById('audioIcon');

// Получение значения переменной состояния кнопки изображения из локального хранилища при загрузке страницы
window.addEventListener('load', () => {
    const storedAudioStatus = localStorage.getItem('isAudioActive');
    if (storedAudioStatus !== null) {
        isAudioActive = JSON.parse(storedAudioStatus);
        updateButtonState();
    }

    const storedImageStatus = localStorage.getItem('isImageActive');
    if (storedImageStatus !== null) {
        isImageActive = JSON.parse(storedImageStatus);
        updateImageButtonState();
    }
});


// Функция для обновления состояния кнопки и сохранения состояния в локальное хранилище
function toggleAudio() {
    isAudioActive = !isAudioActive; // Инвертируем состояние кнопки
    updateButtonState(); // Обновляем состояние кнопки
    // Сохраняем состояние кнопки в локальное хранилище
    localStorage.setItem('isAudioActive', JSON.stringify(isAudioActive));
}

// Функция для обновления внешнего вида кнопки в соответствии с состоянием
function updateButtonState() {
    if (isAudioActive) {
        playAudio();
        audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
        audioIcon.innerHTML = '&#x1F50A;'; // Символ колонки/звука
    } else {
        pauseAudio();
        audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.15)';
        audioIcon.innerHTML = '&#x1F507;'; // Символ выключенной колонки/звука
    }
}

// Получаем ссылку на элемент информации о песне
const songInfo = document.getElementById('songInfo');

// Добавляем обработчик события наведения мыши на кнопку
audioButton.addEventListener('mouseenter', function() {
    // Задаем цвет фона кнопке
    audioButton.style.backgroundColor = 'rgba(128, 0, 128, 0.75)';
    if(isAudioActive){
    // Делаем элемент информации о песне видимым
    songInfo.style.visibility = 'visible';
    }
});

// Добавляем обработчик события увода мыши с кнопки
audioButton.addEventListener('mouseleave', function() {
    // Возвращаем исходный цвет фона кнопке
    audioButton.style.backgroundColor = isAudioActive ? 'rgba(128, 0, 128, 0.5)' : 'rgba(128, 0, 128, 0.15)';
    // Делаем элемент информации о песне невидимым
    songInfo.style.visibility = 'hidden';
});






let isImageActive = false;

// Функция для обновления состояния кнопки изображения и сохранения состояния в локальное хранилище
function toggleImage() {
    isImageActive = !isImageActive; // Инвертируем состояние кнопки изображения
    updateImageButtonState(); // Обновляем состояние кнопки изображения
    // Сохраняем состояние кнопки изображения в локальное хранилище
    localStorage.setItem('isImageActive', JSON.stringify(isImageActive));
}


// Функция для обновления внешнего вида кнопки изображения в соответствии с состоянием
function updateImageButtonState() {
    if (isImageActive) {
        imageButton.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
        imageIcon.innerHTML = '&#x1F4CB;'; // Значок "Записная книжка"
    } else {
        imageButton.style.backgroundColor = 'rgba(128, 0, 128, 0.15)';
        imageIcon.innerHTML = '&#x1F4CB;'; // Значок "Записная книжка"
    }
}





// Получаем ссылку на элемент кнопки изображения
const imageButton = document.getElementById('imageButton');

// Функция для делания кнопки неактивной
function disableButton() {
    const button = document.getElementById('imageButton');
    if (button) {
        button.disabled = true;
    }
}

// Функция для делания кнопки активной
function enableButton() {
    const button = document.getElementById('imageButton');
    if (button) {
        button.disabled = false;
    }
}

// Добавляем обработчик события наведения мыши на кнопку изображения
imageButton.addEventListener('mouseenter', function() {
    // Задаем цвет фона кнопке
    imageButton.style.backgroundColor = 'rgba(128, 0, 128, 0.75)'; // Новый цвет фона кнопки
});

// Добавляем обработчик события увода мыши с кнопки изображения
imageButton.addEventListener('mouseleave', function() {
    // Возвращаем исходный цвет фона кнопки
    imageButton.style.backgroundColor = isImageActive ? 'rgba(128, 0, 128, 0.5)' : 'rgba(128, 0, 128, 0.15)';
});















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








        // Создаем заголовок "Ссылки на основные ресурсы"
        const title1 = document.createElement('h2');
        title1.textContent = 'Ссылки на основные ресурсы:';
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
        newMenuContainer.appendChild(title2);




        // Создаем кнопку Справка с ссылкой
        const linkButton4 = document.createElement('button');
        linkButton4.id = 'resource-link-button4';
        linkButton4.classList.add('encryptText');
        linkButton4.innerHTML = 'Справка'; // Текст кнопки
        linkButton4.addEventListener('click', function() {
            // Замените на фактическую ссылку
            window.location.href = "https://cosm-future.github.io/a-message-of-light/andromeda.html";
        });
        newMenuContainer.appendChild(linkButton4);



        // Создаем кнопку Справка с ссылкой
        const linkButton7 = document.createElement('button');
        linkButton7.id = 'resource-link-button7';
        linkButton7.classList.add('encryptText');
        linkButton7.innerHTML = 'Чат Андромеда'; // Текст кнопки
        linkButton7.addEventListener('click', function() {
            // Замените на фактическую ссылку
            window.location.href = "https://cosm-future.github.io/a-message-of-light/andromeda-chat.html";
        });
        newMenuContainer.appendChild(linkButton7);


        

        // Создаем кнопку Календарь с ссылкой
        const linkButton5 = document.createElement('button');
        linkButton5.id = 'resource-link-button5';
        linkButton5.classList.add('encryptText');
        linkButton5.innerHTML = 'Календарь'; // Текст кнопки
        linkButton5.addEventListener('click', function() {
            // Замените на фактическую ссылку
            window.location.href = "https://cosm-future.github.io/a-message-of-light/calendar.html";
        });
        newMenuContainer.appendChild(linkButton5);

        // Создаем кнопку Календарь с ссылкой
        const linkButton6 = document.createElement('button');
        linkButton6.id = 'resource-link-button6';
        linkButton6.classList.add('encryptText');
        linkButton6.innerHTML = 'Кроссворды'; // Текст кнопки
        linkButton6.addEventListener('click', function() {
            // Открываем ссылку в новой вкладке
            window.open('https://creators-crossword-puzzle12.glitch.me/', '_blank');
        });
        newMenuContainer.appendChild(linkButton6);



        
        

        // Добавляем контейнер в тело документа
        document.body.appendChild(newMenuContainer);
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







// Создаем кнопку
const fullscreenButton = document.createElement('button');



// Добавляем обработчик события при нажатии на кнопку
fullscreenButton.addEventListener('click', function() {
    toggleFullScreen();
});



let fullScreenButtonCreated = false;

let pressTimer;

document.body.addEventListener('mousedown', function(event) {
    if (event.button === 0) { // Проверяем, что это левая кнопка мыши
        // Устанавливаем таймер при нажатии левой кнопки мыши
        pressTimer = setTimeout(() => {
            createButton();
        }, 3000); // 3000 миллисекунд = 3 секунды
    }
});

document.body.addEventListener('mouseup', function() {
    // Очищаем таймер при отпускании кнопки мыши
    clearTimeout(pressTimer);
});

document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Отменяем стандартное действие браузера
});

// Обработчик события начала касания
document.addEventListener('touchstart', function(event) {
    // Проверяем, что касание было сделано одним пальцем
    if (event.touches.length === 1) {
        // Запускаем таймер при начале касания
        pressTimer = setTimeout(() => {
            createButton();
        }, 3000); // 3000 миллисекунд = 3 секунды
    }
});




// Обработчик события окончания касания
document.addEventListener('touchend', function() {
    // Очищаем таймер при окончании касания
    clearTimeout(pressTimer);
});

// Функция для создания кнопки и добавления ее в body
function createButton() {
    if(!fullScreenButtonCreated) {

    fullscreenButton.id = 'fullscreenButton';
fullscreenButton.className = 'fullScr-button';
fullscreenButton.innerHTML = '&#x2197;'; // Используем символы Unicode для стрелок вверх и вниз

    document.body.appendChild(fullscreenButton);
    fullScreenButtonCreated = true;
    }

    // Получаем ссылку на элемент кнопки изображения
const FullScreenButton = document.getElementById('fullscreenButton');



// Добавляем обработчик события нажатия на кнопку изображения
FullScreenButton.addEventListener('click', function() {
    toggleFullScr();
});

// Добавляем обработчик события наведения мыши на кнопку изображения
FullScreenButton.addEventListener('mouseenter', function() {
    // Задаем цвет фона кнопке
    FullScreenButton.style.backgroundColor = 'rgba(128, 0, 128, 0.75)'; // Новый цвет фона кнопки
});

// Добавляем обработчик события увода мыши с кнопки изображения
FullScreenButton.addEventListener('mouseleave', function() {
    // Возвращаем исходный цвет фона кнопки
    FullScreenButton.style.backgroundColor = isFullScreenActive ? 'rgba(128, 0, 128, 0.5)' : 'rgba(128, 0, 128, 0.15)';
});


// Функция для обновления состояния кнопки изображения и сохранения состояния в локальное хранилище
function toggleFullScr() {
    isFullScreenActive = !isFullScreenActive; // Инвертируем состояние кнопки изображения
    updateFullScreenButtonState(); // Обновляем состояние кнопки изображения
}


// Функция для обновления внешнего вида кнопки "Гамбургер" в соответствии с состоянием
function updateFullScreenButtonState() {
const FullScreenButton = document.getElementById('fullscreenButton');
if (!FullScreenButton) return;

if (isFullScreenActive) {
    FullScreenButton.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
} else {
    FullScreenButton.style.backgroundColor = 'rgba(128, 0, 128, 0.15)';
}
}

    // Устанавливаем таймер для удаления кнопки через 5 секунд
    setTimeout(() => {
        fullscreenButton.remove();
        fullScreenButtonCreated = false;
    }, 5000); // 5000 миллисекунд = 5 секунд
}





let isFullScreenActive = false;























// Проверка ориентации устройства
function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        const existingTable = document.querySelector('table');
        if (existingTable) {
            

            // Определение количества строк в таблице
            const rowCount = existingTable.querySelectorAll('tr').length;

            // Установка размера текста для ячеек в зависимости от количества строк
            const cells = existingTable.querySelectorAll('td, th');
            cells.forEach(cell => {
                if (rowCount >= 1) {
                    cell.style.fontSize = '10px'; // Задаем размер текста в пикселях для 1-6 строк
                 
                }
            });
        }
    }
}







// Получаем элемент с идентификатором "imageContainer"
var imageContainerElement = document.getElementById("imageContainer");


// Создаем кнопку
const openTableButton = document.createElement('button');
// Присваиваем кнопке уникальный идентификатор (ID)
openTableButton.id = 'openTableButton';
// Добавляем класс для другой кнопки
openTableButton.classList.add('special-button');
openTableButton.innerHTML = '&#128270;'; // Юникод значок камеры





let tableCreated = false; // Флаг для отслеживания создания таблицы

// Функция для создания или удаления таблицы в зависимости от состояния переменной isImageActive
function toggleTable() {
    if (isImageActive && !tableCreated) {
        // Создаем таблицу и ее родительский контейнер только если они еще не созданы
        // Создаем контейнер для таблицы
        const tableContainer = document.createElement('div');
        tableContainer.id = 'table-container'; // Уникальный идентификатор контейнера
        tableContainer.classList.add('unique-container'); // Уникальный класс контейнера




        const table = document.createElement('table');
        table.id = 'my-table'; // Устанавливаем id для таблицы
        table.classList.add('unique-table'); // Добавляем уникальный класс для таблицы


        // Создаем заголовок таблицы
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        const headers = ['№', 'Посыл / Заповедь', 'Время [мск]'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.style.textAlign = 'center';
            headerRow.appendChild(th);
        });

        // Добавляем 14 строк с данными
for (let i = 0; i < json.length; i++) {
    const rowData = json[i];
    const row = table.insertRow();
    for (let j = 0; j < 3; j++) {
        const cell = row.insertCell();
        if (j === 0) {
            if(eventType == 'обычное') {
            if (i < 30) {
                // Если это первый столбец и номер строки > 0, вставляем номер строки с учетом смещения
                cell.textContent = i + 1;
            }
        } else if(eventType == 'часовое') {
            if (i < 30) {
                // Если это первый столбец и номер строки > 3, вставляем номер строки с учетом смещения
                cell.textContent = i + 1;
            }
        }
            cell.style.width = '5%'; // Устанавливаем очень маленькую ширину для первого столбца
        } else if (j === 1) {
            const text = rowData.text.replace(/\*([^*]+)\*/g, '<br><span style="color: #fd7dff;">$1</span><br>');

            cell.innerHTML = text;
            cell.style.width = '85%'; // Устанавливаем длинную ширину для второго столбца
        } else if (j === 2) {
            const from = `${rowData.from.hour}:${rowData.from.minute}`;
            const to = `${rowData.to.hour}:${rowData.to.minute}`;
            cell.textContent = `${from} - ${to}`; // Вставляем время
            cell.style.width = '10%'; // Устанавливаем очень маленькую ширину для третьего столбца
        }
        cell.style.textAlign = 'center';
        cell.style.padding = '5px';
        cell.style.fontSize = '14px';

        // Определение количества строк в таблице
        const rowCount = table.rows.length;

        

        // Установка стилей для ячеек таблицы
        cell.style.backgroundColor = 'rgba(58, 0, 59, 0.8)';
        cell.style.border = '2px solid rgba(128, 0, 128, 0.8)'; // Светло-фиолетовая граница
        cell.style.transition = 'background-color 0.3s, box-shadow 0.3s'; // Добавляем CSS-переходы для плавной анимации смены цвета заднего фона и тени


    cell.addEventListener('mouseover', function() {
        // Применяем стиль при наведении
        cell.style.border = '2px solid rgba(255, 255, 255, 0.6)';
        cell.style.backgroundColor = 'rgba(33, 0, 54, 0.8)';
        // Добавляем стиль для градиентной тени
        cell.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0.3)';
        
    });

    cell.addEventListener('mouseout', function() {
        // Удаляем стиль при уводе курсора с ячейки
        cell.style.border = '2px solid rgba(128, 0, 128, 0.8)'; // Светло-фиолетовая граница
        cell.style.backgroundColor = 'rgba(58, 0, 59, 0.8)';
        // Удаляем стиль для градиентной тени
        cell.style.boxShadow = 'none';
    });




        
    }
}




// Добавляем кнопку в документ
document.body.appendChild(openTableButton);
        

        // Добавляем таблицу в контейнер
    tableContainer.appendChild(table);

    // Добавляем контейнер на страницу
    document.body.appendChild(tableContainer);

    

setTimeout(function() {
    document.getElementById('table-container').classList.add('show');
}, 500); // Применяем класс show через 100 миллисекунд

        
        // Устанавливаем флаг, что таблица создана
    tableCreated = true;
    checkOrientation();
    container.style.overflowY = 'hidden'; // Прячем скроллбар
} else if (!isImageActive && tableCreated) {
    // Удаляем контейнер с таблицей, если он существует и необходимо его скрыть
    const existingContainer = document.getElementById('table-container');
    if (existingContainer) {
        // Удаляем класс 'show', чтобы запустить анимацию скрытия
        existingContainer.classList.remove('show');
        // Ждем завершения анимации, прежде чем удалять контейнер
        setTimeout(function() {
            existingContainer.remove();
            container.style.overflowY = 'auto'; // Разрешаем скроллбар
            // Сбрасываем флаг
            tableCreated = false;
            // Удаляем кнопку
            openTableButton.remove();
        }, 500); // Подождите 500 миллисекунд, чтобы анимация завершилась
    }
}

}







// Массив ссылок на картинки
const imageLinks = [
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-1.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-2.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-3.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-4.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-5.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-6.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-7.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-8.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-9.jpg',
  'https://github.com/cosm-future/a-message-of-light/raw/main/img/message-random-10.jpg',
  // Добавьте здесь остальные ссылки на картинки
];





// Функция для генерации случайного числа в диапазоне от min до max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для получения случайной ссылки из массива
function getRandomImageLink() {
  const randomIndex = getRandomInt(0, imageLinks.length - 1);
  return imageLinks[randomIndex];
}

let imageElementRandom;

// Функция для установки случайной ссылки на картинку при загрузке страницы
function setRandomImage() {
  const imageElement = document.querySelector('.image');
  const randomImageLink = getRandomImageLink();
  imageElement.src = randomImageLink;
}











let wakeLock = null;

const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    // console.log('Wake Lock активирован');
  } catch (err) {
    // console.error(`${err.name}, ${err.message}`);
  }
};



// Освобождение Wake Lock при закрытии страницы
window.addEventListener('unload', () => {
  if (wakeLock) {
    wakeLock.release()
      .then(() => {
        // console.log('Wake Lock деактивирован');
      })
      .catch((err) => {
        // console.error(`${err.name}, ${err.message}`);
      });
  }
});






document.addEventListener("DOMContentLoaded", function () {
  
    requestWakeLock(); // Запрещаем авто-отключение экрана пока открыт сайт.
    handleNotifications(); // Первый запрос на разрешение Уведомлений на сайте.
    updateTime();
    createLocalContainer();
    updateJsonFile();

    
    
        getRandomSong();
    
    

    // Вызываем функцию загрузки данных и отображения после загрузки
    loadDataAndRender();
    
    setInterval(updateText, 1000);
  
    setRandomImage();

    


    const container = document.querySelector(".container");
    const dateElement = document.querySelector(".date");
    const now = new Date();
    const dayOfMonth = now.getDate();

    dateElement.style.backgroundColor = '#00000000';












    // Устанавливаем тени для элемента даты
    dateElement.style.textShadow = `
    2px 2px 4px rgba(48, 48, 48, 0.6), /* Тень вправо-вниз */
    -2px -2px 4px rgba(48, 48, 48, 0.6), /* Тень влево-вверх */
    2px -2px 4px rgba(48, 48, 48, 0.6), /* Тень вправо-вверх */
    -2px 2px 4px rgba(48, 48, 48, 0.6) /* Тень влево-вниз */
    `;

    // Установка актуальной даты
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = now.toLocaleDateString('ru-RU', options);

    // Добавление текста "Посыл" или "Часовой посыл" в зависимости от особого дня
    let prefix = "Сегодня ";
    if (dayOfMonth === 1 || dayOfMonth === 8 || dayOfMonth === 17 || dayOfMonth === 26) {
        prefix += "Часовой + Ежедневные Посылы. ";
        dateElement.style.color = "gold";
    } else {
        prefix += "Ежедневные Посылы. ";
        dateElement.style.color = "white";
    }

    dateElement.style.left = '0px';

    // Устанавливаем позицию и отступы в медиа запросе для портретного режима
if (window.matchMedia("(orientation: portrait)").matches) {
    dateElement.style.position = 'relative';
    dateElement.style.left = '12px';
}


    dateElement.textContent = `${prefix}${dateString}`;
    // Установка шрифта для элемента dateElement
    dateElement.style.fontFamily = "Play";
    dateElement.style.fontSize = "14px";
  
  
    // Применение стилей из медиа-запроса
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
        dateElement.style.fontSize = "12px";
    } else {
        dateElement.style.fontSize = "16px";
    }







// Проверяем, поддерживает ли браузер API запроса на доступ к аудио и локальное хранилище
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices && 'localStorage' in window) {
    // Проверяем, было ли уже предложено разрешение на доступ к аудио
    if (!localStorage.getItem('audioPermissionRequested')) {
        // Запрашиваем разрешение на использование аудио
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            // Пользователь разрешил использование аудио
            // console.log('Доступ к аудио разрешен');
            // Устанавливаем флаг в локальном хранилище, чтобы не предлагать снова
            localStorage.setItem('audioPermissionRequested', true);
        })
        .catch(function(err) {
            // Пользователь отказал в доступе или произошла ошибка
            // console.log('Доступ к аудио отклонен или произошла ошибка: ' + err);
        });
    }
} else {
    // Браузер не поддерживает запрос на доступ к аудио или локальное хранилище
    // console.log('API запроса на доступ к аудио или локальное хранилище не поддерживается');
}

  
// Проверяем, было ли уже отображено всплывающее окно для разрешения звука
    if (!localStorage.getItem('soundPermissionShown')) {
        // Отображаем всплывающее окно с предложением разрешить звук
        if (confirm('Этот сайт хочет включить звук. Разрешить?')) {
            // Запрашиваем разрешение на включение звука
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => {
                    // Звук успешно разрешен
                    alert('Звук разрешен на этом сайте.');
                })
                .catch((err) => {
                    // Не удалось разрешить звук
                    alert('Не удалось разрешить звук на этом сайте.');
                });
        }
        // Устанавливаем флаг, что всплывающее окно было показано для разрешения звука
        localStorage.setItem('soundPermissionShown', 'true');
    }

    


  

  
  
  
  
    
});


// Сброс всех установок ..........................................................................................
// Функция для проверки, зажаты ли клавиши Shift, Control и Space одновременно
function areAllKeysPressed(event) {
    return event.shiftKey && event.ctrlKey && event.code === "Space";
}

// Обработчик события нажатия клавиши
document.addEventListener("keydown", function(event) {
    // Проверяем, зажаты ли клавиши Shift, Control и Space одновременно
    if (areAllKeysPressed(event)) {
        // Выполняем действие
        clearLocalStorage();
    }
});

// Функция для очистки локального хранилища
function clearLocalStorage() {
    // Удаляем необходимые элементы из локального хранилища
    localStorage.removeItem('xBcF');
    localStorage.clear();
    alert('Локальное хранилище было успешно очищено.');

}
// Сброс всех установок ..........................................................................................

// Рандомный блок
const RandomBlock = ['33426E235E6B503921487635406D5A73463226'];


// Получение значения коррекции времени из локального хранилища при загрузке страницы
const storedCorrection = localStorage.getItem('moscowTimeCorrection');
let moscowTimeDifference = storedCorrection ? parseInt(storedCorrection) : 0;
let isTimeFetched = false;

async function fetchMoscowTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Moscow');
        const data = await response.json();
        const moscowTime = new Date(data.utc_datetime);

        // Сохраняем значение коррекции времени в локальное хранилище
        moscowTimeDifference = moscowTime.getTime() - Date.now();
        localStorage.setItem('moscowTimeCorrection', moscowTimeDifference.toString());
        isTimeFetched = true;

        return moscowTime;
    } catch (error) {
        // console.error('Ошибка при получении времени по Москве:', error);
        return null;
    }
}

async function updateTime() {
    try {
        if (!isTimeFetched) {
            await fetchMoscowTime(); // Вызываем функцию только если время еще не было получено
        }

        let moscowTime = new Date(Date.now() + moscowTimeDifference);

        const timeElement = document.querySelector(".time");
        const options = { timeZone: 'Europe/Moscow', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const moscowTimeString = moscowTime.toLocaleString('en-US', options);
        timeElement.textContent = moscowTimeString;
        return timeElement;
    } catch (error) {
        // console.error('Ошибка при обновлении времени:', error);
    }
}



















let json_min_origin;
let json_max_origin;


let json_min;
let json_max;

















// функция для шифрования
function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const text = ReverseContainer(RandomBlock); 
    const encryptedText = CryptoJS.AES.encrypt(inputText, text).toString();
    document.getElementById('encryptedText').value = encryptedText;
}

// Функция для расшифровки текста
function decryptText(encryptedText) {
    const text = ReverseContainer(RandomBlock); 
    const bytes = CryptoJS.AES.decrypt(encryptedText, text);
    return bytes.toString(CryptoJS.enc.Utf8);
}


// Функция для чтения данных из Excel и их расшифровки
async function readAndDecryptExcel(url) {
try {
const response = await fetch(url);
if (!response.ok) {
    throw new Error('Network response was not ok');
}
const buffer = await response.arrayBuffer();
const data = new Uint8Array(buffer);
const workbook = XLSX.read(data, { type: 'array' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Преобразуем данные в нужный формат, пропуская первую строку и первую колонку
const jsonArray = [];
for (let i = 1; i < jsonData.length; i++) {
    const [_, text, interval] = jsonData[i]; // Пропускаем первый элемент (первая колонка)
    let fromHour, fromMinute, toHour, toMinute;

    // Извлекаем часы и минуты для времени начала
    const fromMatch = interval.match(/^(\d+):(\d+)/);
    if (fromMatch) {
        fromHour = parseInt(fromMatch[1]);
        fromMinute = parseInt(fromMatch[2]);
    } else {
        fromHour = NaN;
        fromMinute = NaN;
    }

    // Извлекаем часы и минуты для времени окончания
    const toMatch = interval.match(/-(\d+):(\d+)/);
    if (toMatch) {
        toHour = parseInt(toMatch[1]);
        toMinute = parseInt(toMatch[2]);
    } else {
        // Если временной интервал не содержит "-", то его продолжительность 0 минут
        toHour = fromHour;
        toMinute = 0;
    }

    jsonArray.push({
        from: { hour: fromHour, minute: fromMinute },
        to: { hour: toHour, minute: toMinute },
        text: decryptText(text.trim()) // Расшифровываем текст и удаляем лишние пробелы
    });
}

return jsonArray; // Возвращаем массив JSON
} catch (error) {
// console.error('There was a problem with your fetch operation:', error);
throw error; // Пробрасываем ошибку дальше
}
}

// URL файлов Excel
const excelUrlMin = 'https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/json_min.xlsx';
const excelUrlMax = 'https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/json_max.xlsx';




// Загружаем и расшифровываем данные из Excel
async function loadData() {
try {
json_min = await readAndDecryptExcel(excelUrlMin);
// console.log('json_min:', json_min);
} catch (error) {
// console.error('Error loading and decrypting json_min:', error);
}

try {
json_max = await readAndDecryptExcel(excelUrlMax);
// console.log('json_max:', json_max);
} catch (error) {
// console.error('Error loading and decrypting json_max:', error);
}
}

// Вызываем функцию загрузки данных
loadData();


async function loadDataAndRender() {
try {
await loadData(); // Ждем, пока данные загрузятся
updateText(); // После успешной загрузки вызываем функцию обновления текста
} catch (error) {
// console.error('Error loading data:', error);
}
}








let messageRecordingPlayed = false;





// Глобальное объявление переменной
var notificationDisplayed = false;


let json = null; // Начальное значение

let isSoundAndVibrationPlayed = false; // Добавляем переменную для отслеживания проигрывания звука и вибрации


function updateText() {


    // Функция для получения текущей даты и времени по часовому поясу Москвы
function getMoscowTimeSR() {
    const now = new Date();
    const moscowTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
    return moscowTime;
}
    
    const now = getMoscowTimeSR();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const textElement = document.querySelector(".text");
    const dayOfMonth = now.getDate();
  
    // console.log('json_min:', json_min);
    // console.log('json_max:', json_max);

    updateTime();
    updateJsonFile();
    

// Проверяем, находится ли аудиоплеер на паузе и включен ли он, и если да, то загружаем аудио и запускаем воспроизведение
if (audioPlayer.paused && isAudioActive) {
    audioPlayer.pause(); // Останавливаем текущее воспроизведение

    getRandomSong(); // Получаем следующую песню

    audioPlayer.src = song_link; // Устанавливаем новую песню в качестве источника для аудиоплеера
    audioPlayer.load(); // Загружаем новую песню

    // Добавляем обработчик события loadedmetadata, который вызывается, когда метаданные аудиофайла (например, продолжительность) загружены
    audioPlayer.addEventListener('loadedmetadata', function() {
        audioPlayer.play().then(_ => {
            // Обработчик успешного запуска воспроизведения
            // console.log('Воспроизведение начато');
        }).catch(error => {
            // Обработчик ошибки запуска воспроизведения
            // console.error('Ошибка запуска воспроизведения:', error);
        });
    });
}

toggleTable();

openTableButton.addEventListener('click', function() {
    if (!isButtonClicked) { // Проверяем, не было ли уже выполнено нажатие
        // Получаем HTML-содержимое таблицы
        const tableHTML = document.getElementById('my-table').outerHTML;

        // Отправляем данные в буферный скрипт
        localStorage.setItem('tableHTML', tableHTML);

        // Открываем новую вкладку с table.html
        window.open('table.html');

        isButtonClicked = true; // Устанавливаем флаг в true, чтобы указать, что кнопка была нажата

        // Сбрасываем флаг через 3 секунды
        setTimeout(function() {
            isButtonClicked = false; // Устанавливаем флаг обратно в false
        }, 2000); // 2000 миллисекунд = 2 секунды
    }
});




// Функция проверки и отображения уведомления
function checkAndShowNotification() {
    if (!isIntervalActive && hoursLeft === 0 && minutesLeft <= 5) {
        // Если уведомление еще не было отображено или осталось ровно 5 минут
        if (!notificationDisplayed) {
            // Устанавливаем флаг, что уведомление будет отображено
            notificationDisplayed = true;

            // Проверяем текущий статус разрешения на уведомления
            if (Notification.permission === "granted") {
                // Определяем текст уведомления в зависимости от оставшегося времени
                var notificationText = (minutesLeft < 5) ? "Внимание! Осталось менее 5 минут до подготовки к Посылу." : "Готовность. Осталось 5 минут до подготовки к Посылу.";
                
                // Отправляем уведомление
                var notification = new Notification(notificationText);
            }
        }
    }
}


// Обработчик события изменения ориентации экрана
window.addEventListener('orientationchange', function() {
    // Перезагружаем страницу
    location.reload();
    // Устанавливаем фоновый цвет body в черный
    document.body.style.backgroundColor = "black";
}, false);
setInterval(checkAndShowNotification, 1000); // Вызываем функцию каждую секунду


 


    json = (dayOfMonth === 1 || dayOfMonth === 8 || dayOfMonth === 17 || dayOfMonth === 26) && (
        (hours === 10 && minutes >= 55) || (hours === 11) || (hours === 12 && minutes < 5)
    ) ? json_max : json_min;

    if (json === json_min) {
        eventType = 'обычное';
    } else if (json === json_max) {
        eventType = 'часовое';
    } else {
        //console.error('Некорректное значение переменной json');
    }

    
    


    let newText = "";
    
  
    // console.log('Значение json:', json); // Выводим значение json в консоль

    for (const interval of json) {
        if ((hours > interval.from.hour || (hours === interval.from.hour && minutes >= interval.from.minute)) &&
            (hours < interval.to.hour || (hours === interval.to.hour && minutes < interval.to.minute))) {
            newText = interval.text;

            isIntervalActive = true;
            
            if (isIntervalActive) {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = false;
                }
            } else {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = true;
                }
            }

            const buttonBuild = document.getElementById('buttonBuild');
            if(xBcF == 1 || xBcF == true || xBcF){
                buttonBuild.style.display = 'block';
                } 
            
            
            // Вызов функции каждые 1 секунд
          if (isIntervalActive) {
            jsonFileRandomMusic = 'main-music.json';




            // Проверяем, находится ли аудиоплеер на паузе и включен ли он, и если да, то загружаем аудио и запускаем воспроизведение
if (!messageRecordingPlayed && isAudioActive && jsonFileRandomMusic == 'main-music.json') {
    audioPlayer.pause(); // Останавливаем текущее воспроизведение

    getRandomSong(); // Получаем следующую песню

    audioPlayer.src = song_link; // Устанавливаем новую песню в качестве источника для аудиоплеера
    audioPlayer.load(); // Загружаем новую песню
    messageRecordingPlayed = true; // Запрещаем песне проигрываться снова и снова каждую секунду

    // Добавляем обработчик события loadedmetadata, который вызывается, когда метаданные аудиофайла (например, продолжительность) загружены
    audioPlayer.addEventListener('loadedmetadata', function() {
        audioPlayer.play();
    });
}




            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            
            // Скрываем элемент
            watchElement.style.display = 'none';
            titleVisitorsElement.style.display = 'none';
            videoPlayer.display = 'none';
            videoPlayer.style.opacity = '0';
            
            // Применение стилей из медиа-запроса
            disableButtonAndromeda();

        } else {
            jsonFileRandomMusic = 'free-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'block';
            titleVisitorsElement.style.display = 'block';
            videoPlayer.display = 'block';
            if (isPortrait) {
                // Ориентация экрана портретная
                videoPlayer.style.opacity = '1';
            
            } else {
                // Ориентация экрана не портретная
                videoPlayer.style.opacity = '0.25';
            }
            if(xBcF == 1 || xBcF == true || xBcF){
                buttonBuild.style.display = 'block';
                } 
                
                enableButtonAndromeda();


        }
            

        
          
            if (imageElement.src != 'https://github.com/cosm-future/a-message-of-light/raw/main/message-base-1.png') {
          imageElement.src = 'https://github.com/cosm-future/a-message-of-light/raw/main/message-base-1.png';
          isIntervalActive = true;

          
            if (hoursLeft === 0 && minutesLeft <= 5) {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = false;
                }
            } else {
                const buttonT = document.getElementById('imageButton');
                if (buttonT) {
                    buttonT.disabled = true;
                }
            }
        

          // Вызов функции каждые 1 секунд
          if (isIntervalActive) {
            jsonFileRandomMusic = 'main-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'none';
            titleVisitorsElement.style.display = 'none';
            videoPlayer.display = 'none';
            videoPlayer.style.opacity = '0';
            
            if(xBcF == 1 || xBcF == true || xBcF){
                buttonBuild.style.display = 'block';
                } 
                
                disableButtonAndromeda();

        } else {
            jsonFileRandomMusic = 'free-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'block';
            titleVisitorsElement.style.display = 'block';
            videoPlayer.display = 'block';
            if (isPortrait) {
                // Ориентация экрана портретная
                videoPlayer.style.opacity = '1';
            
            } else {
                // Ориентация экрана не портретная
                videoPlayer.style.opacity = '0.25';
            }
            if(xBcF == 1 || xBcF == true || xBcF){
                buttonBuild.style.display = 'block';
                } 
                
                enableButtonAndromeda();
        }


          fetch(jsonFileRandomMusic)
        .then(response => response.json())
        .then(data => {
            // Получение случайного объекта из массива
            const randomSong = data[Math.floor(Math.random() * data.length)];

            // Присваивание значений переменным
            name_of_the_song = randomSong.название;
            songwriter = randomSong.автор;
            song_link = randomSong.ссылка;

            audioSource.src = song_link;
            audioPlayer.load();

            // Подставляем значения переменных в текст элементов
            songTitleElement.textContent = name_of_the_song;
            artistNameElement.textContent = songwriter;

            // Здесь можно выполнить другие действия с полученными данными
        });

        playSoundAndVibration();

    };


 // Применение стилей из медиа-запроса
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
        container.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #3e2723, #3e2723)';
        setTimeout(function() {
        // Получаем ссылку на контейнер "меню на ресурсы"
        const menuContainer = document.getElementById('menu-container');
        menuContainer.style.backgroundColor = 'rgba(92, 59, 35, 0.7)';
        document.querySelector('.menu-container').style.opacity = '1';
        

    }, 300); // Подождите 500 миллисекунд, чтобы анимация завершилась
        
    } else {
            // Ждем завершения анимации, прежде чем обновлять переливающийся фон.
        setTimeout(function() {
            document.body.style.backgroundColor = "black";
            document.body.style.background = "linear-gradient(to bottom, black 50%, #3e2723 100%)";
            container.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #3e2723, #3e2723)';
            // Получаем ссылку на контейнер "меню на ресурсы"
        const menuContainer = document.getElementById('menu-container');
        menuContainer.style.backgroundColor = 'rgba(92, 59, 35, 0.7)';
        document.querySelector('.menu-container').style.opacity = '1';

        }, 300); // Подождите 500 миллисекунд, чтобы анимация завершилась
        
    }
      

    // Проверяем условие для альбомного режима и высоты экрана
    if (window.matchMedia("(orientation: landscape)").matches) {
        // Устанавливаем фоновый цвет body в черный
        setTimeout(function() {
        document.body.style.backgroundColor = "black";
        container.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #3e2723, #3e2723)';
        // Получаем ссылку на контейнер "меню на ресурсы"
        const menuContainer = document.getElementById('menu-container');
        menuContainer.style.backgroundColor = 'rgba(92, 59, 35, 0.7)';
        document.querySelector('.menu-container').style.opacity = '1';

    }, 300); 
        
    }


    // Адаптивный шрифт в портретном режиме
    if (window.matchMedia("(max-width: 500px) and (orientation: portrait)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '15px';
    } else if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '19px';
    } else if (window.matchMedia("(max-width: 800px) and (orientation: portrait)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '23px';
    } else if (window.matchMedia("(max-width: 1080px) and (orientation: portrait)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '27px';
    }

    // Адаптивный шрифт в альбомном режиме
    if (window.matchMedia("(max-height: 500px) and (orientation: landscape)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '15px';
    } else if (window.matchMedia("(max-height: 600px) and (orientation: landscape)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '19px';
    } else if (window.matchMedia("(max-height: 800px) and (orientation: landscape)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '23px';
    } else if (window.matchMedia("(max-height: 1080px) and (orientation: landscape)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '27px';
    }


         
          
    document.querySelector('.quatrain').style.display = 'none';
    const intervalDuration = (interval.to.hour - hours) * 3600 + (interval.to.minute - minutes) * 60 - now.getSeconds();
    if (!lineElement) {
        const container = document.querySelector(".container");
        lineElement = document.createElement("div");
        lineElement.classList.add("line");
        container.appendChild(lineElement);
    
        lineElement.style.transition = `width ${intervalDuration}s linear`;
        lineElement.style.width = "0"; // Устанавливаем ширину линии в начальное состояние
    
        setTimeout(() => {
            lineElement.style.width = "100%"; // Увеличиваем ширину линии до максимального значения
        }, 100);
    
        setTimeout(() => {
            playSoundAndVibration();
            if (navigator.vibrate) {
                navigator.vibrate(3000);
            } else {
                // console.log("Устройство не поддерживает вибрацию.");
            }
            lineElement.style.width = "0"; // Устанавливаем ширину линии обратно в 0
            setTimeout(() => {
                lineElement.remove();
                lineElement = null;
                const nextInterval = json.find(next => {
                    const startTime = new Date();
                    startTime.setHours(next.from.hour, next.from.minute, 0);
                    return startTime > now;
                });
                if (!nextInterval) {
                    setTimeout(() => {
                        
                    }, 3000);
                }
            }, 1000);
        }, intervalDuration * 1000 + 100);
    }
    break;
            }
        }    

    if (!newText) {

        
       

            if (imageElement.src == 'https://github.com/cosm-future/a-message-of-light/raw/main/message-base-1.png') {

            setRandomImage();
            isIntervalActive = false;

            

            
                if (hoursLeft === 0 && minutesLeft <= 5) {
                    const buttonT = document.getElementById('imageButton');
                    if (buttonT) {
                        buttonT.disabled = false;
                    }
                } else {
                    const buttonT = document.getElementById('imageButton');
                    if (buttonT) {
                    
                        buttonT.disabled = true;
                    }
                }
            
  
            // Вызов функции каждые 1 секунд
            if (isIntervalActive) {
              jsonFileRandomMusic = 'main-music.json';
              // Получаем ссылку на элемент по его id
              const watchElement = document.getElementById('watch');
              const titleVisitorsElement = document.getElementById('titleVisitors');
              const buttonBuild = document.getElementById('buttonBuild');
              // Скрываем элемент
              watchElement.style.display = 'none';
              titleVisitorsElement.style.display = 'none';
              videoPlayer.display = 'none';
              videoPlayer.style.opacity = '0';
              if(xBcF == 1 || xBcF == true || xBcF){
                buttonBuild.style.display = 'block';
                } 
                
                disableButtonAndromeda();
          } else {
              jsonFileRandomMusic = 'free-music.json';
              // Получаем ссылку на элемент по его id
              const watchElement = document.getElementById('watch');
              const titleVisitorsElement = document.getElementById('titleVisitors');
              const buttonBuild = document.getElementById('buttonBuild');
              // Скрываем элемент
              watchElement.style.display = 'block';
              titleVisitorsElement.style.display = 'block';
              videoPlayer.display = 'block';
              if (isPortrait) {
                // Ориентация экрана портретная
                videoPlayer.style.opacity = '1';
            
            } else {
                // Ориентация экрана не портретная
                videoPlayer.style.opacity = '0.25';
            }
              if(xBcF == 1 || xBcF == true || xBcF){
                buttonBuild.style.display = 'block';
                } 
                enableButtonAndromeda();
          }
  
            fetch(jsonFileRandomMusic)
          .then(response => response.json())
          .then(data => {
              // Получение случайного объекта из массива
              const randomSong = data[Math.floor(Math.random() * data.length)];
  
              // Присваивание значений переменным
              name_of_the_song = randomSong.название;
              songwriter = randomSong.автор;
              song_link = randomSong.ссылка;
  
              audioSource.src = song_link;
              audioPlayer.load();
  
              // Подставляем значения переменных в текст элементов
              songTitleElement.textContent = name_of_the_song;
              artistNameElement.textContent = songwriter;
  
              // Здесь можно выполнить другие действия с полученными данными
          });  
          };

        
      
     

        isIntervalActive = false;
        
        messageRecordingPlayed = false;
      

        
        // Вызов функции каждые 1 секунд
        if (isIntervalActive) {
            jsonFileRandomMusic = 'main-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            
            // Скрываем элемент
            watchElement.style.display = 'none';
            titleVisitorsElement.style.display = 'none';
            videoPlayer.display = 'none';
            videoPlayer.style.opacity = '0';

            if(xBcF == 1 || xBcF == true || xBcF){
                buttonBuild.style.display = 'block';
                } 
            
                disableButtonAndromeda();

            
        } else {
            jsonFileRandomMusic = 'free-music.json';
            // Получаем ссылку на элемент по его id
            const watchElement = document.getElementById('watch');
            const titleVisitorsElement = document.getElementById('titleVisitors');
            const buttonBuild = document.getElementById('buttonBuild');
            // Скрываем элемент
            watchElement.style.display = 'block';
            titleVisitorsElement.style.display = 'block';
            videoPlayer.display = 'block';
            // Устанавливаем нулевую прозрачность
            if (isPortrait) {
                // Ориентация экрана портретная
                videoPlayer.style.opacity = '1';
            
            } else {
                // Ориентация экрана не портретная
                videoPlayer.style.opacity = '0.25';
            }
            
            // Применение стилей из медиа-запроса
           
            if(xBcF == 1 || xBcF == true || xBcF){
                buttonBuild.style.display = 'block';
                } 
                
                enableButtonAndromeda();



                
    
        }


        
        


    // Применение стилей из медиа-запроса
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
        container.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #3500a8df, #3500a8df)'; 

        setTimeout(function() {
// Получаем ссылку на контейнер "меню на ресурсы"
const menuContainer = document.getElementById('menu-container');
menuContainer.style.backgroundColor = 'rgba(45, 0, 128, 0.7)';
document.querySelector('.menu-container').style.opacity = '1';

        }, 300); // Подождите 500 миллисекунд, чтобы анимация завершилась

        

        
    } else {
        // Ждем завершения анимации, прежде чем обновлять переливающийся фон.
        setTimeout(function() {
            document.body.style.backgroundColor = "black";
            document.body.style.background = "linear-gradient(to bottom, black 50%, rgba(0, 2, 141, 0.815) 100%)";
        container.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #3500a8df, #3500a8df)'; 
        // Получаем ссылку на контейнер "меню на ресурсы"
        const menuContainer = document.getElementById('menu-container');
        menuContainer.style.backgroundColor = 'rgba(45, 0, 128, 0.7)';
        document.querySelector('.menu-container').style.opacity = '1';

        }, 300); // Подождите 500 миллисекунд, чтобы анимация завершилась
        
 
    }
      
    // Проверяем условие для альбомного режима и высоты экрана
    if (window.matchMedia("(orientation: landscape)").matches) {
        // Устанавливаем фоновый цвет body в черный
        setTimeout(function() {
        document.body.style.backgroundColor = "black";
        container.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), #3500a8df, #3500a8df)';
        // Получаем ссылку на контейнер "меню на ресурсы"
        const menuContainer = document.getElementById('menu-container');
        menuContainer.style.backgroundColor = 'rgba(45, 0, 128, 0.7)'; 
        document.querySelector('.menu-container').style.opacity = '1';

    }, 300); 
        
    }
    

    // Адаптивный шрифт в портретном режиме
    if (window.matchMedia("(max-width: 500px) and (orientation: portrait)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '15px';
    } else if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '19px';
    } else if (window.matchMedia("(max-width: 800px) and (orientation: portrait)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '23px';
    } else if (window.matchMedia("(max-width: 1080px) and (orientation: portrait)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '27px';
    }

    // Адаптивный шрифт в альбомном режиме
    if (window.matchMedia("(max-height: 500px) and (orientation: landscape)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '15px';
    } else if (window.matchMedia("(max-height: 600px) and (orientation: landscape)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '19px';
    } else if (window.matchMedia("(max-height: 800px) and (orientation: landscape)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '23px';
    } else if (window.matchMedia("(max-height: 1080px) and (orientation: landscape)").matches) {
        const textElement = document.querySelector(".text");
        textElement.style.fontSize = '27px';
    }
    



        
        // Отобразить элемент
        document.querySelector('.quatrain').style.display = 'block';
      
      
    let nextSending = null;
    let nextSendingDate = null;

    // Перебираем массив, чтобы найти ближайший посыл
    for (const interval of json) {
        const startTime = new Date();
        startTime.setHours(interval.from.hour, interval.from.minute, 0);
        
        // Если время начала текущего посыл - позже текущего времени и это первый найденный посыл
        if (startTime > now && !nextSending) {
            nextSending = startTime;
            nextSendingDate = startTime;
        }
    }

    
 

    // Определяем время следующего посылa в Московском часовом поясе (UTC+3)




// Функция для получения текущей даты и времени по часовому поясу Москвы
function getMoscowTime() {
    const now = new Date();
    const moscowTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
    return moscowTime;
}

// Если не был найден посыл в текущем дне
if (!nextSending) {
    // Определяем первый посыл на следующий день
    const firstSending = new Date();
    firstSending.setDate(firstSending.getDate() + 1);
    firstSending.setHours(json[0].from.hour, json[0].from.minute, json[0].from.second || 0, 0);


    // Вычисляем время до первого посыл на следующий день
    const timeDiff = Math.max(firstSending - getMoscowTime(), 0);
    nextSendingDate = firstSending;

    hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

    newText = `До начала подготовки к следующему Посылу: ${hoursLeft} ч. ${minutesLeft} мин.`;

    if (hoursLeft === 0 && minutesLeft <= 5) {
        const buttonT = document.getElementById('imageButton');
        if (buttonT) {
            buttonT.disabled = false;
        }
    } else {
        const buttonT = document.getElementById('imageButton');
        if (buttonT) {
            buttonT.disabled = true;
        }
    }
} else {
    // Вычисляем время до ближайшего посыл в текущем дне
    const timeDiff = Math.max(nextSending - getMoscowTime(), 0);

    hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

    newText = `До начала подготовки к следующему Посылу: ${hoursLeft} ч. ${minutesLeft} мин.`;

    if (hoursLeft === 0 && minutesLeft <= 5) {
        const buttonT = document.getElementById('imageButton');
        if (buttonT) {
            buttonT.disabled = false;
        }
    } else {
        const buttonT = document.getElementById('imageButton');
        if (buttonT) {
            buttonT.disabled = true;
        }
    }
}


        if (lineElement) {
            lineElement.remove();
            lineElement = null;
        }
    }

    


    

    const parts = newText.split('*');
    const html = parts.map((part, index) => `<span${index % 2 !== 0 ? ' class="animated"' : ''}>${part}</span>`).join('');
    textElement.innerHTML = html;






}




// Функция для Реверсирования из одного контейра в другой.
function ReverseContainer(value) {
    return value[0].match(/.{1,2}/g).map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
}





function playSoundAndVibration() {
    // Воспроизводим звук
    const audio = new Audio('https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/sound/sound_of_a_bell.mp3');
    audio.play();

    // Воспроизводим вибрацию
    if (navigator.vibrate) {
            // Если есть поддержка вибрации
            navigator.vibrate(1500); // Вибрация на 2 секунды
    } else {
        // console.log("Устройство не поддерживает вибрацию.");
    }
}








// Вызываем функцию для обновления случайного четверостишия
displayRandomQuatrain();
// Вызываем функцию для обновления случайного четверостишия каждые 5 минут
setInterval(displayRandomQuatrain, 5 * 60 * 1000);




// Для хтмл запаска <meta property="og:url" content="https://message-of-love.glitch.me/">



function updateJsonFile() {

    if (isIntervalActive) {
        jsonFileRandomMusic = 'main-music.json';
    } else {
        jsonFileRandomMusic = 'free-music.json';
    }
    // Далее вы можете использовать переменную jsonFileRandomMusic по вашему усмотрению
}







// Функция для проверки пароля
function checkPassword() {
    // Получаем введенный пользователем пароль
    const userPassword = document.getElementById('admin-password').value;

    // Чтение содержимого файла "key.txt"
    fetch('key.txt')
        .then(response => response.text())
        .then(encryptedPassword => {
            // console.log(encryptedPassword);
            
            

            // Дешифрование полученного зашифрованного пароля
            const decryptedPassword = CryptoJS.AES.decrypt('U2FsdGVkX1+Q0REYIvTY+t8ml5pFPrTMGieZ7MKGOefqIQiDkN7uSXi2wlPNUU1l', decryptText('U2FsdGVkX1+yXQvK/Dj8nYyfVEuidGrZTyCAkEB2FHR9qFF6qEa1TOfGarhgGG3d')).toString(CryptoJS.enc.Utf8);

            // console.log('Дешифрованный пароль:', decryptedPassword);

            // Используем дешифрованный пароль как ожидаемый пароль
            const expectedPassword = decryptedPassword;
            // console.log('Ожидаемый пароль:', expectedPassword);

            // Проверяем существование админского контейнера
            const adminContainer = document.querySelector('.admin-container');

            if (adminContainer) {
                // Проверяем, существует ли уже сообщение в контейнере
                let messageElement = adminContainer.querySelector('.admin-message');
                
                if (!messageElement) {
                    // Если сообщения нет, создаем новое
                    messageElement = document.createElement('div');
                    messageElement.classList.add('admin-message');
                    adminContainer.appendChild(messageElement);
                }

                // Проверяем длину строки введенного пользователем пароля
                if (userPassword.length === 0) {
                    messageElement.textContent = 'Ожидание данных';
                    messageElement.classList.remove('success', 'error');
                    messageElement.classList.add('waiting');
                } else {
                    // Сравнение введенного пользователем пароля с ожидаемым паролем и обновление текста сообщения
                    if (userPassword === expectedPassword) {
                        messageElement.textContent = 'Секретный ключ совпал';
                        messageElement.classList.remove('error', 'waiting');
                        messageElement.classList.add('success');

                        // Проверяем, существует ли уже кнопка в контейнере
                        let buttonElement = adminContainer.querySelector('.get-access-button');
                        if (!buttonElement) {
                            // Если кнопки нет, создаем новую
                            buttonElement = document.createElement('button');
                            buttonElement.textContent = 'ПОЛУЧИТЬ ДОСТУП';
                            buttonElement.classList.add('get-access-button');
                            buttonElement.id = 'get-access-button';
                            messageElement.appendChild(buttonElement);
                        }
                    } else {
                        messageElement.textContent = 'Ошибка ввода';
                        messageElement.classList.remove('success', 'waiting');
                        messageElement.classList.add('error');

                        // Удаляем кнопку, если она существует
                        const buttonElement = adminContainer.querySelector('.get-access-button');
                        if (buttonElement) {
                            buttonElement.remove();
                        }
                    }
                }
            } else {
                // console.error('Админский контейнер не найден');
            }
        })
        .catch(error => {
            // console.error('Произошла ошибка при чтении файла:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    setInterval(checkPassword, 500);
    // Запрещаем менять ориентацию экрана
window.addEventListener('orientationchange', function(event) {
    event.preventDefault();
}, false);
});








// Обработчик нажатия клавиш
document.addEventListener('keydown', function(event) {
    // Проверяем нажатие клавиши Shift + Пробел + F8
    if (event.shiftKey && event.code === 'F8') {
        // Проверяем, существует ли контейнер
        const adminContainer = document.querySelector('.admin-container');
        if (adminContainer) {
            // Удаляем созданные элементы, если они уже существуют
            adminContainer.remove();
        } else {
            // Создаем контейнер
            const container = document.createElement('div');
            container.classList.add('admin-container');

            // Создаем надпись
            const label = document.createElement('div');
            label.textContent = 'Введите пароль для административного доступа.';
            container.appendChild(label);

            // Создаем поле ввода
            const input = document.createElement('input');
            input.classList.add('admin-input');
            input.id = 'admin-password'; // Устанавливаем айди для инпута
            input.type = 'password'; // Устанавливаем тип инпута
            input.placeholder = 'Введите секретный ключ ...'; // Устанавливаем плейсхолдер
            container.appendChild(input);

            // Добавляем контейнер в body
            document.body.appendChild(container);
        }

        // Предотвращаем дальнейшее выполнение события
        event.preventDefault();
    }
});

// Проверка сторонних сервисов
const xBcF = localStorage.getItem('xBcF');
let LermA;

document.addEventListener('click', function(event) {
    // Проверяем, было ли событие клика по кнопке 
    if (event.target.matches('.get-access-button')) {
        // Устанавливаем флаг в true
        localStorage.setItem('xBcF', true);
        // Проверка сторонних сервисов
        LermA = true;

        
        createLocalContainer();

        // Удаляем родительский контейнер и его содержимое
        const adminContainer = document.querySelector('.admin-container');
        if (adminContainer) {
            adminContainer.remove();
        }
    }
});

function createLocalContainer() {
    if(xBcF || LermA) {
        // Проверяем, существует ли уже контейнер
        if (!document.getElementById('yHxJ')) {
            const uPmH = document.createElement('div');
            const AES_KEY = "ThisIsTheSecretKey123"; 

            // Обозначаем заголовок
            const encryptedString = CryptoJS.AES.encrypt(decryptText('U2FsdGVkX1+vRMFZcJjJvLVKNNdr/NrdFMxFFFe72KuL4GNLc/ia+Krpd1qI+E2C'), AES_KEY).toString();
            
            // Заменяем значение в rQwE
            const rQwE = [encryptedString];
            
            // Расшифровываем значение для отображения в uPmH.textContent
            const decryptedString = CryptoJS.AES.decrypt(rQwE[0], AES_KEY).toString(CryptoJS.enc.Utf8);
            
            uPmH.textContent = decryptedString; // Расшифровываем значение
            uPmH.classList.add('uPmH'); // Класс
            uPmH.id = 'yHxJ'; // Айди
            document.body.appendChild(uPmH); // Добавляем контейнер в body

            const buttonBuild = document.getElementById('buttonBuild');
            buttonBuild.style.display = 'block';


            // Создаем контейнер "Контент"
        const contentContainer = document.createElement('div');
        contentContainer.id = 'contentContainer'; // Устанавливаем уникальный ID
        contentContainer.classList.add('contentContainer'); // Добавляем класс

        // Создаем заголовок для контейнера
        const title = document.createElement('h1');
        title.textContent = 'Управление'; // Устанавливаем текст заголовка

        // Добавляем заголовок в контейнер
        contentContainer.appendChild(title);

        // Добавляем контейнер в body
        document.body.appendChild(contentContainer);



        // Создаем кнопку "Директория"
        const directoryButton = document.createElement('button');
        directoryButton.id = 'directoryButton'; // Устанавливаем уникальный ID
        directoryButton.classList.add('encryptText'); // Добавляем класс
        directoryButton.textContent = 'Директория'; // Устанавливаем текст кнопки

        // Создаем ссылку
        const link = document.createElement('a');
        link.href = 'https://github.com/cosm-future/a-message-of-light'; // Устанавливаем адрес сайта
        link.target = '_blank'; // Открываем ссылку в новой вкладке
        link.textContent = directoryButton.textContent; // Устанавливаем текст ссылки
        link.classList.add('directoryLink'); // Добавляем класс ссылке


        

        // Убираем текст из кнопки
        directoryButton.textContent = '';

        // Помещаем ссылку внутрь кнопки
        directoryButton.appendChild(link);

        // Добавляем кнопку в контейнер "Контент"
        contentContainer.appendChild(directoryButton);





// Создаем кнопку "Аналитика"
const analyticsButton = document.createElement('button');
analyticsButton.id = 'analyticsButton'; // Устанавливаем уникальный ID
analyticsButton.classList.add('encryptText'); // Добавляем класс
analyticsButton.textContent = 'Аналитика'; // Устанавливаем текст кнопки

// Создаем ссылку
const linkanalytics = document.createElement('a');
linkanalytics.href = 'https://metrika.yandex.ru/dashboard?group=day&period=week&id=96836708'; // Устанавливаем адрес сайта
linkanalytics.target = '_blank'; // Открываем ссылку в новой вкладке
linkanalytics.textContent = analyticsButton.textContent; // Устанавливаем текст ссылки
linkanalytics.classList.add('directoryLink'); // Добавляем класс ссылке

// Убираем текст из кнопки
analyticsButton.textContent = '';

// Помещаем ссылку внутрь кнопки
analyticsButton.appendChild(linkanalytics);

// Добавляем кнопку в контейнер "Контент"
contentContainer.appendChild(analyticsButton);



// Создаем кнопку "Загрузить текст 5 минутного Посыла"
const download5messageButton = document.createElement('button');
download5messageButton.id = 'download5messageButton'; // Устанавливаем уникальный ID
download5messageButton.classList.add('encryptText'); // Добавляем класс
download5messageButton.textContent = 'Загрузить текст 5 минутных Посылов'; // Устанавливаем текст кнопки

// Привязываем обработчик события клика по кнопке
download5messageButton.addEventListener('click', function() {
    downloadFile5(); // Вызываем функцию загрузки файла по ссылке
});

// Добавляем кнопку "Загрузить текст 5 минутного Посыла" в контейнер "Контент"
contentContainer.appendChild(download5messageButton);

function downloadFile5() {
    // Создаем ссылку на скачивание файла
    const fileURL = 'https://github.com/cosm-future/a-message-of-light/raw/main/json_min.xlsx';

    // Создаем элемент <a> для скачивания файла
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'json_min.xlsx'; // Устанавливаем имя файла для скачивания

    // Добавляем элемент <a> на страницу и эмулируем клик по нему
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}





// Создаем кнопку "Загрузить текст 5 минутного Посыла"
const download60messageButton = document.createElement('button');
download60messageButton.id = 'download60messageButton'; // Устанавливаем уникальный ID
download60messageButton.classList.add('encryptText'); // Добавляем класс
download60messageButton.textContent = 'Загрузить текст Часового Посыла'; // Устанавливаем текст кнопки

// Привязываем обработчик события клика по кнопке
download60messageButton.addEventListener('click', function() {
    downloadFile60(); // Вызываем функцию загрузки файла по ссылке
});

// Добавляем кнопку "Загрузить текст 5 минутного Посыла" в контейнер "Контент"
contentContainer.appendChild(download60messageButton);

function downloadFile60() {
    // Создаем ссылку на скачивание файла
    const fileURL = 'https://github.com/cosm-future/a-message-of-light/raw/main/json_max.xlsx';

    // Создаем элемент <a> для скачивания файла
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'json_max.xlsx'; // Устанавливаем имя файла для скачивания

    // Добавляем элемент <a> на страницу и эмулируем клик по нему
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}









            

          // Создаем кнопку
          const exitButton = document.createElement('button');
          // Присваиваем кнопке уникальный идентификатор (ID)
          exitButton.id = 'ExitRNT';
          // Добавляем класс для кнопки
          exitButton.classList.add('ExitRNT');
          // Устанавливаем текст кнопки
          exitButton.textContent = 'Выйти';

          // Помещаем кнопку в родительский элемент
          document.body.appendChild(exitButton);

          // Привязываем обработчик события клика по кнопке
    exitButton.addEventListener('click', function() {
        clearLocalStorage();
        // Обновляем страницу
        location.reload();
    })


        }
    }
}


function showPopup() {
    var popup = document.getElementById('popup');
    var localContainer = document.getElementById('yHxJ'); // ID локального контейнера

    // Проверяем, существует ли локальный контейнер
    if (localContainer) {
        popup.style.display = 'block'; // Показываем попап
    } else {
        popup.style.display = 'none'; // Скрываем попап
    }
}

// Вызываем функцию при загрузке страницы
window.onload = function() {
    showPopup();
};


setInterval(showPopup, 2000);










// Функция для вставки описания в контейнер
function insertDescription(container, description) {
    // Разбиваем описание на строки по тире
    const lines = description.split('- ');

    // Создаем HTML-разметку для описания
    const descriptionHTML = lines.map((line, index) => {
        if (index === 0) {
            // Первая строка без тега <br>
            return `<p>${line.trim()}</p>`;
        } else {
            // Остальные строки с тегом <br>
            return `<p> - ${line.trim()}</p>`;
        }
    }).join('');

    // Вставляем HTML-разметку в контейнер
    container.innerHTML = descriptionHTML;
}

  
  
  
  
  // Получаем кнопку
  const button = document.getElementById('buttonBuild');
  
  // Переменная для хранения состояния активности кнопки
  let buttonBuildActive = false;
  
  // Функция для создания контейнера
  function createContainer() {
    // Проверяем, существует ли контейнер
    const existingContainer = document.getElementById('historyContainer');
    if (!existingContainer) {
      // Создаем новый контейнер
      const container = document.createElement('div');
      container.id = 'historyContainer';
      container.className = 'history-container';
  
      // Загружаем содержимое файла news.json
      fetch('news.json')
        .then(response => response.json()) // Распарсиваем JSON-ответ
        .then(data => {
          // Создаем HTML-разметку текста внутри контейнера на основе данных из файла
          container.innerHTML = `
            <div class="history-header">История изменений:</div>
            <div class="history-content">
              ${data.map(entry => `
                <div>
                  <span class="date">${entry.date}</span><br>
                  <span class="change"></span>
                </div>
              `).join('')}
            </div>
          `;
  
          // Добавляем описание в каждую запись
          const changeElements = container.querySelectorAll('.change');
          data.forEach((entry, index) => {
            insertDescription(changeElements[index], entry.description);
          });
  
          // Добавляем контейнер в тело документа
          document.body.appendChild(container);
        })
        // .catch(error => console.error('Error loading news.json:', error));
  
      // Изменяем значение переменной состояния кнопки
      buttonBuildActive = true;
    } else {
      // Если контейнер уже существует, удаляем его
      existingContainer.remove();
  
      // Изменяем значение переменной состояния кнопки
      buttonBuildActive = false;
    }
  
    // Обновляем стили кнопки в зависимости от значения переменной состояния кнопки
    button.style.backgroundColor = buttonBuildActive ? 'rgba(72, 0, 228, 0.695)' : 'rgba(53, 0, 168, 0.25)';
  }
  
  // Добавляем обработчик события при нажатии на кнопку
  button.addEventListener('click', createContainer);
  





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
        questions: ["Открой сайт Календаря", "Открой сайт Календар", "Аткрой сайт Календаря", "Аткрой сайт Календар",
        "Открой сайт Колендаря", "Открой сайт Колендаря", "Покажи Колендарь", "Покажи Календарь"], 
        answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/I_open_the_calendar.mp3", 
        type: "переход по ссылке на Календарь" 
    },
    { 
        questions: ["Открой сайт чата", "Открой сайт чат", "Аткрой сайт чата", "Аткрой сайт чат",
        "Покажи чат"], 
        answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/open_suit.mp3", 
        type: "переход по ссылке на Чат" 
    },
    { 
        questions: ["Открой диктовки Метатрона", "Открой дектовки Метатрона", "Аткрой диктовки Метатрона", "Аткрой дектовки Метатрона",
        "Диктовки Метатрона"], 
        answer: "https://raw.githubusercontent.com/cosm-future/a-message-of-light/main/advice_on_the_right_source.mp3",
        type: "переход на эзотерические сайты" 
    },
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
        qa.type === "переход по ссылке на Календарь" || 
        qa.type === "переход по ссылке на Чат" ||
        qa.type === "переход на эзотерические сайты") {
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
            } else if (qa.type === "переход по ссылке на Календарь") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = "https://cosm-future.github.io/a-message-of-light/calendar.html";
                    });
            } else if (qa.type === "переход по ссылке на Чат") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    // Замените на фактическую ссылку
                    window.location.href = "https://cosm-future.github.io/a-message-of-light/andromeda-chat.html";
                    });
            } else if (qa.type === "переход на эзотерические сайты") {
                // Слушаем событие завершения воспроизведения аудио
                audio.addEventListener('ended', function() {
                    
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


const containerMessage = document.querySelector(".container");





 // Создаем элементы видеоплеера
 const videoContainer = document.getElementById('video-container');
 const videoPlayer = document.createElement('video');
 const source = document.createElement('source');

 // Устанавливаем атрибуты и свойства элементов
 videoPlayer.id = 'video-player';
 videoPlayer.classList.add('video-player');

 videoPlayer.controls = false; // Скрываем элементы управления
 videoPlayer.autoplay = true; // Автовоспроизведение
 videoPlayer.loop = true; // Зацикливание видео
 source.src = 'flame_mini.mp4';
 source.type = 'video/mp4';

 // Добавляем источник видео к элементу видеоплеера
 videoPlayer.appendChild(source);

 const messageContent = document.createElement('div');
 messageContent.classList.add('message-content');
 // Добавляем элемент в контейнер сообщений
 containerMessage.appendChild(messageContent);

 // Проверяем ориентацию экрана
const isPortrait = window.innerHeight > window.innerWidth;

// Добавляем видеоплеер в контейнер или в `<body>` в зависимости от ориентации экрана
if (isPortrait) {
    // Ориентация экрана портретная
    document.body.appendChild(videoPlayer);
    videoPlayer.classList.add('video-player');
    videoPlayer.play();

} else {
    // Ориентация экрана не портретная
    containerMessage.appendChild(videoPlayer);
    videoPlayer.play();
}
          







// Функция для переключения между обычным режимом и полноэкранным
function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // Если нет элемента в полноэкранным режиме, то запросим развертывание сайта на весь экран
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        console.log('Переключение в полноэкранный режим');
    } else {
        // Если уже есть элемент в полноэкранным режиме, то выйдем из полноэкранного режима
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        console.log('Выход из полноэкранный режим');
    }
}








        



// Проверяем, используется ли Яндекс.Браузер
function isYandexBrowser() {
    return /YaBrowser/i.test(navigator.userAgent);
}

// Пример использования
if (isYandexBrowser()) {
    // Логика для Яндекс.Браузера
    document.addEventListener('click', function() {
        videoPlayer.play();
    });
}

  
// Проверяем, используется ли Opera
function isOperaBrowser() {
    return /Opera|OPR\//i.test(navigator.userAgent);
}

// Пример использования
if (isOperaBrowser()) {
    // Логика для браузера Opera
    document.addEventListener('click', function() {
        videoPlayer.play();
    });
}


    



