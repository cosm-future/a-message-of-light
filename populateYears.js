const currentYear = new Date().getFullYear();
for (let i = 2004; i <= 2030; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  if (i === currentYear) {
    option.selected = true;
  }
  document.getElementById('year').appendChild(option);
}
