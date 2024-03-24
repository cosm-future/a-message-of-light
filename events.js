// Применяем стиль для сегодняшних ячеек
function applyTodayCellStyle(year, month) {
    const today = new Date();
    const calendarCells = document.querySelectorAll('#calendar tbody td');
    calendarCells.forEach(cell => {
        const cellDate = new Date(year, month, cell.textContent);
        if (cellDate.toDateString() === today.toDateString()) {
            cell.classList.add('today'); // Добавляем класс для сегодняшней ячейки
        } else {
            cell.classList.remove('today'); // Удаляем класс, если это не сегодняшняя ячейка
        }
    });
}

// Функция для загрузки JSON из файла
function loadJSON(callback) {   
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'events.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);  
}

// Функция для добавления событий в календарь
function addEventsToCalendar(events) {
    const calendarCells = document.querySelectorAll('#calendar tbody td');
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const year = eventDate.getFullYear();
        const month = eventDate.getMonth();
        const day = eventDate.getDate();
        calendarCells.forEach(calendarCell => {
            if (calendarCell.textContent == day && 
                parseInt(calendarCell.dataset.year) === year && 
                parseInt(calendarCell.dataset.month) === month) {
                    calendarCell.classList.add('event');
                    calendarCell.addEventListener('mouseenter', function() {
                        const eventText = document.createElement('span');
                        let eventContent = event.event.includes('*') ? event.event.split('*').join('<br>') : event.event;
                        // Добавляем жирность для текста, обрамленного символом ^, и закрашиваем его в золотой цвет
                        eventContent = eventContent.replace(/\^([^\^]+)\^/g, '<b style="color: gold;">$1</b>');
                        eventText.innerHTML = eventContent;
                        eventText.classList.add('event-text');
                        calendarCell.appendChild(eventText); // Добавляем текст события в ячейку

                        // Добавляем обработчик события щелчка мыши
                        let clickTimeout;
                        calendarCell.addEventListener('mousedown', function() {
                            clickTimeout = setTimeout(function() {
                                // Формируем URL для создания нового события в Яндекс Календаре
                                const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const startTs = `${formattedDate}T00:00:00`;
                                const endTs = `${formattedDate}T23:59:59`;
                                const encodedEvent = encodeURIComponent(eventContent); // Кодируем текст события для передачи в URL
                                const yandexCalendarURL = `https://calendar.yandex.ru/week/create?startTs=${startTs}&endTs=${endTs}&isAllDay=1&show_date=${formattedDate}&title=${encodedEvent}`;
                                window.open(yandexCalendarURL, '_blank');
                            }, 3000); // 3000 мс = 3 секунды
                        });

                        // Очищаем таймаут при отпускании кнопки мыши
                        calendarCell.addEventListener('mouseup', function() {
                            clearTimeout(clickTimeout);
                        });
                    });
                    calendarCell.addEventListener('mouseleave', function() {
                        const eventText = calendarCell.querySelector('.event-text');
                        if (eventText) {
                            eventText.remove();
                        }
                    });
            }
        });
    });
}
















// Функция для генерации календаря
function generateCalendar() {
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
  
    const calendarWrapper = document.getElementById('calendar-wrapper');
    calendarWrapper.innerHTML = ''; // Очистить предыдущий календарь
  
    const calendarContainer = document.createElement('div'); // Создаем общий контейнер для таблицы календаря и событий
    calendarContainer.id = 'calendar-container';

    const table = document.createElement('table');
    table.id = 'calendar';
  
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');
  
    // Создание заголовков дней недели
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']; // Воскресенье (0) теперь первый элемент
    for (let day of daysOfWeek) {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
  
    table.appendChild(thead);
    table.appendChild(tbody);
    calendarContainer.appendChild(table);
  
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
  
    let currentDay = 1;
    let currentRow = document.createElement('tr');
    
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const cell = document.createElement('td');
        currentRow.appendChild(cell);
    }
  
    while (currentDay <= numDaysInMonth) {
        const cell = document.createElement('td');
        cell.textContent = currentDay;
        cell.dataset.year = year; // Добавляем атрибуты с годом и месяцем
        cell.dataset.month = month;
        currentRow.appendChild(cell);
  
        if (currentRow.children.length === 7) {
            tbody.appendChild(currentRow);
            currentRow = document.createElement('tr');
        }
  
        currentDay++;
    }
  
    while (currentRow.children.length < 7) {
        const cell = document.createElement('td');
        currentRow.appendChild(cell);
    }
  
    tbody.appendChild(currentRow);

    // Применяем стиль для сегодняшних ячеек
    applyTodayCellStyle(year, month, calendarContainer);

    // Загрузка данных из файла JSON и добавление событий
    loadJSON(function(events) {
        addEventsToCalendar(events, calendarContainer);
    });

    // Добавляем общий контейнер в календарный элемент
    calendarWrapper.appendChild(calendarContainer);
}

// Функция для применения стиля для сегодняшних ячеек
function applyTodayCellStyle(year, month, calendarContainer) {
    const today = new Date();
    const calendarCells = calendarContainer.querySelectorAll('#calendar tbody td');
    calendarCells.forEach(cell => {
        const cellDate = new Date(year, month, cell.textContent);
        if (cellDate.toDateString() === today.toDateString()) {
            cell.classList.add('today'); // Добавляем класс для сегодняшней ячейки
        } else {
            cell.classList.remove('today'); // Удаляем класс, если ячейка не сегодняшняя
        }
    });
}

// Вызываем функцию для генерации календаря сразу после загрузки страницы
generateCalendar();




// Вызываем функцию для загрузки данных из файла JSON и добавления событий
loadJSON(function(events) {
    generateCalendar();
    addEventsToCalendar(events);
});

// Добавляем обработчики событий для изменения месяца или года
document.getElementById('month').addEventListener('change', function() {
    generateCalendar();
    loadJSON(function(events) {
        addEventsToCalendar(events);
    });
});

document.getElementById('year').addEventListener('change', function() {
    generateCalendar();
    loadJSON(function(events) {
        addEventsToCalendar(events);
    });
});
