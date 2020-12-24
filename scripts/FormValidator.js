class FormValidator {

    enableValidation = (cfg) => {
    // console.log(cfg)
    const formList = document.querySelectorAll(cfg.formSelector);
    // console.log(formList)
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log(formElement);
      });

      const inputList = formElement.querySelectorAll(cfg.inputSelector);
      const submit = formElement.querySelector(cfg.submitSelector);

      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkValid(inputElement, formElement, cfg);
          this._submitCheck(formElement, submit, cfg);
        })
      })
    });
  }

  _submitCheck = (formElement, submit, cfg) => {
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

  _showError = (inputElement, formElement, cfg) => {
    const error = formElement.querySelector(`#${inputElement.id}-error`);
    error.textContent = inputElement.validationMessage;
    inputElement.classList.add(cfg.inputInvalidSelector);
  }

  _hideError = (inputElement, formElement, cfg) => {
    const error = formElement.querySelector(`#${inputElement.id}-error`);
    error.textContent = '';
    inputElement.classList.remove(cfg.inputInvalidSelector);
  }

  _checkValid =  (inputElement, formElement, cfg) => {
   if(inputElement.validity.valid) {
     this._hideError(inputElement, formElement, cfg)
    } else {
     this._showError(inputElement, formElement, cfg);
    }
  }
}


