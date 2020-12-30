export default class FormValidator {

  constructor(form, cfg) {
    this.form = form;
    this.cfg = cfg;
  }

  enableValid = () => {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = this.form.querySelectorAll(this.cfg.inputSelector);
    const submit = this.form.querySelector(this.cfg.submitSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement, this.form, this.cfg);
        this._submitCheck(this.form, submit, this.cfg);
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


