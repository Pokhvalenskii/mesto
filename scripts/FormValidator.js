export default class FormValidator {

  constructor(form, cfg) {
    this.form = form;
    this.cfg = cfg;
    this._enableValidTest(this.form, this.cfg)
  }

  _enableValidTest = (form, cfg) => {
    // console.log(form);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = form.querySelectorAll(cfg.inputSelector);
    const submit = form.querySelector(cfg.submitSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement, form, cfg);
        this._submitCheck(form, submit, cfg);
      });
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


