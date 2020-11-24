const form = document.querySelector('.popup__form');
const inputs = document.querySelectorAll('.popup__input');

form.addEventListener('submit', (evt) => {
  console.log('Отправка формы');
});

inputs.forEach(input => {
  input.addEventListener('input', (evt) => {
    showError(form, input)
  })
});

function showError(form, input){
  const error = form.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    input.classList.remove('popup__input_status_invalid');
    error.textContent = '';
  }
  else {
    input.classList.add('popup__input_status_invalid');
    error.textContent = input.validationMessage;
  }
}



console.log(form)
console.log(inputs)

