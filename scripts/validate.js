const cfgValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidSelector: 'popup__input_status_invalid',
  submitSelector: '.popup__btn-save',
  submitInvalidSelector: '.popup__btn-save_status_invalid'
}

enableValidation(cfgValidation);

function enableValidation (cfg) {
  const formList = document.querySelectorAll(cfg.formSelector);

  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // console.log('нажал на форму')
      // console.log(formElement)
    });
    
    const inputList = formElement.querySelectorAll(cfg.inputSelector);
    console.log('input list: ', inputList)
    
    const submit = formElement.querySelector(cfg.submitSelector);
    console.log(submit)

    inputList.forEach((inputElement) => {
      console.log(formElement);
      inputElement.addEventListener('input', () => {
        checkValid(inputElement, formElement, cfg);
        submitCheck(formElement, submit);
      })
    })
  });
}

function submitCheck (formElement, submit) {
  if(formElement.checkValidity()){
    console.log('Наша форма валидна');
    submit.disabled = false;
    submit.classList.remove('popup__btn-save_state_invalid');
    submit.classList.add('popup__btn-save_state_valid');
  } else {
    console.log('наша форма не валидна');
    submit.disabled = true;
    submit.classList.remove('popup__btn-save_state_valid');
    submit.classList.add('popup__btn-save_state_invalid');
  }
}

function showError (inputElement, formElement, cfg) {
  const error = formElement.querySelector(`#${inputElement.id}-error`);
  error.textContent = inputElement.validationMessage;
  inputElement.classList.add(cfg.inputInvalidSelector);
}

function hideError (inputElement, formElement, cfg) {
  const error = formElement.querySelector(`#${inputElement.id}-error`);
  error.textContent = '';
  inputElement.classList.remove(cfg.inputInvalidSelector);
}

function checkValid (inputElement, formElement, cfg) {
 if(inputElement.validity.valid) {
   console.log('valid element: ', inputElement);
   hideError(inputElement, formElement, cfg)
  } else {
   console.log('invalid element', inputElement);
   showError(inputElement, formElement, cfg);
  }
}

