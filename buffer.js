document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные из локального хранилища
    const tableHTML = localStorage.getItem('tableHTML');

    // Если данные есть, вставляем их в содержимое страницы
    if (tableHTML) {
        document.body.innerHTML = tableHTML;
    } else {
        // Выводим сообщение об ошибке, если данных нет
        document.body.innerHTML = 'Ошибка: Данные не найдены';
    }

    // Применяем стили к ячейкам таблицы
const cells = document.getElementsByTagName('td');
for (let cell of cells) {
    cell.style.backgroundColor = '#fff'; // Применяем белый цвет фона к ячейкам
    cell.style.border = '1px solid black'; // Применяем черные границы к ячейкам
}






    // Очищаем данные из локального хранилища после использования
    localStorage.removeItem('tableHTML');
});
