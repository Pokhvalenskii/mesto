const formList = document.querySelectorAll('.popup__form');
//const inputList = document.querySelectorAll('.popup__input')

//console.log(formList)
//console.log(inputList);

function enableValidation () {
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // console.log('нажал на форму')
      // console.log(formElement)
    });
    
    const inputList = formElement.querySelectorAll('.popup__input');
    console.log('input list: ', inputList)
    
    const submit = formElement.querySelector('.popup__btn-save');
    console.log(submit)
    //submitCheck (submit, inputList);
    inputList.forEach((inputElement) => {
      //console.log(inputElement);
      inputElement.addEventListener('input', () => {
        //console.log('inputEvent: ', inputElement.validity.valid);
        checkValid(inputElement, formElement);
        //console.log('НАША ФОРМА', formElement.checkValidity());
        submitCheck(formElement, submit);
      })
    })
  });
}

function submitCheck (formElement, submit) {
  if(formElement.checkValidity()){
    console.log('Наша форма валидна');
    submit.disabled = false;
    //formElement.classList.add('checked-valid');
  } else {
    console.log('наша форма не валидна');
    submit.disabled = true;
    //formElement.classList.add('checked-IN-valid');

  }
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



function checkValid (inputElement, formElement) {
 if(inputElement.validity.valid) {
   console.log('valid element: ', inputElement);
   hideError(inputElement, formElement)
  } else {
   console.log('invalid element', inputElement);
   showError(inputElement, formElement);
  }
}

enableValidation();