const cfgValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidSelector: 'popup__input_status_invalid',
  submitSelector: '.popup__btn-save',
  submitInvalidSelector: '.popup__btn-save_status_invalid',
  submitStateInvalidSelector: 'popup__btn-save_state_invalid',
  submitStateValidSelector: 'popup__btn-save_state_valid'
}

enableValidation(cfgValidation);

function enableValidation (cfg) {
  const formList = document.querySelectorAll(cfg.formSelector);

  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = formElement.querySelectorAll(cfg.inputSelector);
    const submit = formElement.querySelector(cfg.submitSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkValid(inputElement, formElement, cfg);
        submitCheck(formElement, submit, cfg);
      })
    })
  });
}

function submitCheck (formElement, submit, cfg) {
  if(formElement.checkValidity()){
    submit.disabled = false;
    submit.classList.remove(cfg.submitStateInvalidSelector);
    submit.classList.add(cfg.submitStateValidSelector);

  } else {
    submit.disabled = true;
    submit.classList.remove(cfg.submitStateValidSelector);
    submit.classList.add(cfg.submitStateInvalidSelector);
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
   hideError(inputElement, formElement, cfg)
  } else {
   showError(inputElement, formElement, cfg);
  }
}

