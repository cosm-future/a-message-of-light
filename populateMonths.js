const currentMonth = new Date().getMonth();
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
for (let i = 0; i < 12; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = monthNames[i];
  if (i === currentMonth) {
    option.selected = true;
  }
  document.getElementById('month').appendChild(option);
}
