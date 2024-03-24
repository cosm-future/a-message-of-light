document.addEventListener('DOMContentLoaded', function() {
    const screenshotButton = document.createElement('button');
    screenshotButton.id = 'screenshot-button';
    screenshotButton.innerHTML = '&#128247;'; // Юникод значок камеры
    screenshotButton.style.fontSize = '24px'; // Размер шрифта для иконки
    screenshotButton.style.marginTop = '5px'; // Вертикальный отступ от прочих элементов
    screenshotButton.style.width = '40px'; // Установите нужные размеры кнопки
    screenshotButton.style.height = '40px'; // Установите нужные размеры кнопки
    screenshotButton.style.display = 'flex'; // Устанавливаем flex-контейнер
    screenshotButton.style.justifyContent = 'center'; // Центрируем содержимое по горизонтали
    screenshotButton.style.alignItems = 'center'; // Центрируем содержимое по вертикали

    // Добавляем кнопку на страницу в новой вкладке
    document.body.appendChild(screenshotButton);

    const screenshotBtn = document.getElementById('screenshot-button');
    screenshotBtn.addEventListener('click', handleScreenshotButtonClick);
});

// Функция для обработки нажатия на кнопку скриншота
function handleScreenshotButtonClick() {
    const screenshotBtn = document.getElementById('screenshot-button');
    // Скрываем кнопку перед созданием скриншота
    screenshotBtn.style.display = 'none';

    try {
        // Применяем стили для скрытия ненужных элементов при печати
        const style = document.createElement('style');
        style.innerHTML = `
            /* Скрываем ссылку на документ */
            a[href]:after {
                display: none !important;
            }
    
            /* Скрываем дату печати */
            .date, .date::after {
                display: none !important;
            }
    
            /* Скрываем название документа */
            .document-title {
                display: none !important;
            }
            @media print {
                /* Скрываем поля при печати */
                @page {
                    margin: 0;
                }
            }
            
        `;
        document.head.appendChild(style);

        // Вызываем стандартную функцию печати страницы
        window.print();

        // Показываем кнопку после вызова печати
        screenshotBtn.style.display = 'flex';

        // Удаляем добавленные стили после печати
        style.remove();
    } catch (error) {
        console.error('Ошибка при вызове печати страницы:', error);
        // Показываем кнопку в случае ошибки
        screenshotBtn.style.display = 'flex';
    }
}
