const formList = document.querySelectorAll('.popup__form');
//const inputList = document.querySelectorAll('.popup__input')

//console.log(formList)
//console.log(inputList);

function enableValidation () {
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('нажал на форму')
      console.log(formElement)
    });
    
    const inputList = formElement.querySelectorAll('.popup__input');
    //console.log('input list: ', inputList)
    
    inputList.forEach((inputElement) => {
      //console.log(inputElement);
      inputElement.addEventListener('input', () => {
        //console.log('inputEvent: ', inputElement.validity.valid);
        checkValidity(inputElement, formElement);
      })
    })

  });
}

function showError (inputElement, formElement) {
  const error = formElement.querySelector(`#${inputElement.id}-error`);
  error.textContent = inputElement.validationMessage;
  inputElement.classList.add('popup__input_status_invalid');
}

function hideError (inputElement, formElement) {
  const error = formElement.querySelector(`#${inputElement.id}-error`);
  error.textContent = '';
  inputElement.classList.remove('popup__input_status_invalid');
}

function checkValidity (inputElement, formElement) {
 if(inputElement.validity.valid) {
   console.log('valid element: ', inputElement);
   hideError(inputElement, formElement)
  } else {
   console.log('invalid element', inputElement);
   showError(inputElement, formElement);
  }
}

enableValidation();